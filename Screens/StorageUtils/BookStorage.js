import * as firebase from "firebase";
import { Storage } from 'expo-storage'

export async function clearAllStorageData() {
    await Storage.setItem({
        key: "data",
        value: JSON.stringify([])
    })
    await Storage.setItem({
        key: "titles",
        value: JSON.stringify({})
    })
    await Storage.setItem({
        key: "favBooks",
        value: JSON.stringify([])
    })
    await Storage.setItem({
        key: "completedBooks",
        value: JSON.stringify([])
    })
}

export const getLocalStorageBook = async (language) => {
    var storageData = await Storage.getItem({ key: "data" })
    if (storageData == undefined) storageData = []
    else storageData = Array.from(JSON.parse(storageData))

    var titles = await Storage.getItem({ key: "titles" })
    if (titles == undefined) titles = {}
    else titles = Array.from(JSON.parse(titles))

    // Filter Language
    var dataLang = []
    var titlesLang = []
    for (var i = 0; i < storageData.length; i++) {
        if (storageData[i].language.toLowerCase() == language.toLowerCase()) {
            dataLang.push(storageData[i])
            titlesLang.push(titles[i])
        }
    }

    return [dataLang, titlesLang]
}

export const getCloudBooks = async () => {
    var datas = []
    const snapshot = await firebase.firestore().collection("Books").get()
    snapshot.forEach((doc) => {
        const data = doc.data()
        // Filter out language and check if cloud book is not in local storage
        datas.push({ ...data, id: doc.id })
    })

    return datas
}

export const addBookLocally = async (title, description, language, book, imageBase64) => {
    var data = await Storage.getItem({ key: "data" })
    data = Array.from(JSON.parse(data))

    var titles = await Storage.getItem({ key: "titles" })
    titles = JSON.parse(titles)

    const length = data.length

    const obj = {
        bookId: length,
        title: title,
        language: language,
        description: description,
        source: `data:image/jpeg;base64,${imageBase64}`,
        book: book
    }
    titles.push(title)
    data.push(obj)

    await Storage.setItem({
        key: "data",
        value: JSON.stringify(data)
    })

    await Storage.setItem({
        key: "titles",
        value: JSON.stringify(titles)
    })
}

export async function getFavBooks(data, titles, use_full_data) {
    const favBooks = Array.from(
        JSON.parse(await Storage.getItem({ key: "favBooks" }))
    );
    if (use_full_data === true) {
        if (favBooks) {
            var arr = [];
            titles.forEach((value, index) => {
                if (favBooks.indexOf(value) >= 0) {
                    arr.push(data[index]);
                }
            });
            return arr
        } else {
            return undefined
        }
    } else {
        return favBooks
    }
}

export async function getCompletedBooks(data, titles, use_full_data) {
    const completedBooks = Array.from(
        JSON.parse(await Storage.getItem({ key: "completedBooks" }))
    );
    if (use_full_data === true) {
        if (completedBooks) {
            var arr = [];
            titles.forEach((value, index) => {
                if (completedBooks.indexOf(value) >= 0) {
                    arr.push(data[index]);
                }
            });
            return arr
        } else {
            return undefined
        }
    } else {
        return completedBooks
    }
}

export async function getAdminBooks() {
    const snapshot = await firebase
        .firestore()
        .collection("BooksReview")
        .get();

    var datas = [];

    snapshot.forEach((doc) => {
        datas.push({ ...doc.data(), "isAdmin": true, "id": doc.id });
    });

    return datas
}

export async function setBookAsComplete(item) {
    var completedBooks = JSON.parse(
        await Storage.getItem({ key: "completedBooks" })
    )
    if (completedBooks == undefined) {
        completedBooks = [item.title]
    }
    else {
        completedBooks.push(item.title)
    }
    await Storage.setItem({
        key: "completedBooks",
        value: JSON.stringify(completedBooks)
    })

    return completedBooks
}

export async function removeFromCompleted(item) {
    var completedBooks = JSON.parse(
        await Storage.getItem({ key: "completedBooks" })
    )
    for (var i = 0; i < completedBooks.length; i++) {
        if (completedBooks[i] == item.title) {
            completedBooks.splice(i, 1)
            break
        }
    }

    await Storage.setItem({
        key: "completedBooks",
        value: JSON.stringify(completedBooks)
    })
    return completedBooks
}

export async function addToFav(item) {
    var favBooks = JSON.parse(
        await Storage.getItem({ key: "favBooks" })
    )
    if (favBooks == undefined) {
        favBooks = [item.title]
    }
    else {
        favBooks.push(item.title)
    }
    await Storage.setItem({
        key: "favBooks",
        value: JSON.stringify(favBooks)
    })
    return favBooks
}

export async function removeFromFav(item) {
    var favBooks = JSON.parse(
        await Storage.getItem({ key: "favBooks" })
    )
    for (var i = 0; i < favBooks.length; i++) {
        if (favBooks[i] == item.title) {
            favBooks.splice(i, 1)
            break
        }
    }

    await Storage.setItem({
        key: "favBooks",
        value: JSON.stringify(favBooks)
    })

    return favBooks
}

export async function removeFromData(item) {
    var data = JSON.parse(
        await Storage.getItem({ key: "data" })
    )
    for (var i = 0; i < data.length; i++) {
        if (data[i].title == item.title) {
            data.splice(i, 1)
            break
        }
    }

    await Storage.setItem({
        key: "data",
        value: JSON.stringify(data)
    })
}

function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}

export async function uploadBook(item, directBook = false) {
    var collectionSelect = "BooksReview"
    if (directBook === true) {
        collectionSelect = "Books"
    }
    let uid = firebase.auth()?.currentUser?.uid;
    const document = firebase.firestore().collection(collectionSelect).doc(item.title + " " + uid.toString())

    await document.set({ title: item.title, language: item.language, description: item.description, lenPages: Object.keys(item.book).length, source: item.source })

    for (var i = 0; i < Object.keys(item.book).length; i++) {
        const keySet = "page" + (i + 1).toString()
        await document.collection(keySet).doc((i + 1).toString()).set({ value: item.book[i] }).catch((e) => {
            alert(e)
            i = item.length
        })
        // To avoid writing too much at the same time :)
        await delay(1100)
    }
}

export async function acceptBook(item) {
    const id = item["id"]
    const lenPages = item["lenPages"]

    // Then delete the data about the selected item
    for (var i = 0; i < lenPages; i++) {
        await firebase.firestore()
            .collection("BooksReview")
            .doc(id)
            .collection("page" + (i + 1).toString())
            .doc((i + 1).toString())
            .delete()
    }
    await firebase.firestore().collection("BooksReview").doc(id).delete()

    // Then store new set into actual books
    const collectionSelect = "Books"
    let uid = firebase.auth()?.currentUser?.uid;
    const document = firebase.firestore().collection(collectionSelect).doc(item.title + " " + uid.toString())

    document.set({ title: item.title, language: item.language, description: item.description, source: item.source, lenPages: Object.keys(item.book).length })

    for (var i = 0; i < Object.keys(item.book).length; i++) {
        const keySet = "page" + (i + 1).toString()
        await document.collection(keySet).doc((i + 1).toString()).set({ value: item.book[keySet] }).catch((e) => {
            alert(e)
            i = item.length
        })
        // To avoid writing too much at the same time :)
        await delay(1100)
    }
}

export async function getBookPages(id, lenPages, fromBookReview = false) {
    var collectionName = "Books"
    if (fromBookReview === true) {
        collectionName = "BooksReview"
    }

    const document = firebase.firestore().collection(collectionName).doc(id)
    const arr = []

    for (var i = 0; i < lenPages; i++) {
        const keySet = "page" + (i + 1).toString()
        const snapshot = await document.collection(keySet).doc((i + 1).toString()).get()
        arr.push(snapshot.data()["value"])
    }

    return arr
}