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

export const getBookData = async (language) => {
    var storageData = await Storage.getItem({ key: "data" })
    if (storageData == undefined) storageData = []
    else storageData = Array.from(JSON.parse(storageData))

    var titles = await Storage.getItem({ key: "titles" })
    if (titles == undefined) titles = {}
    else titles = JSON.parse(titles)

    // Also get any books that has been accepted
    const snapshot = await firebase.firestore().collection("Books").get()
    var ids = []
    var datas = []

    // Filter books
    snapshot.forEach((doc) => {
        const data = doc.data()
        if (!(data.title in titles)) {
            if ((language != null && data.language == language) || language == null) {
                ids.push(doc.id)
                datas.push(doc.data())
            }
        }
    })

    for (var x = 0; x < ids.length; x++) {
        var title = datas[x].title
        if (title in titles) {
            ids.splice(x)
            datas.splice(x)
        }
    }

    // Get Pages
    for (var x = 0; x < ids.length; x++) {
        var dict = { ...datas[x], book: {} }
        const lenPages = dict.lenPages

        // get collections data
        for (var i = 0; i < lenPages; i++) {
            const pageSnapshot = await firebase.firestore()
                .collection("Books")
                .doc(ids[x])
                .collection("page" + (i + 1).toString())
                .doc((i + 1).toString())
                .get()
            dict.book["page" + (i + 1).toString()] = pageSnapshot.data()["value"]
        }
        titles[datas[x].title] = storageData.length
        storageData.push(dict)
    }

    // Storage 
    await Storage.setItem({
        key: "data",
        value: JSON.stringify(storageData)
    })
    await Storage.setItem({
        key: "titles",
        value: JSON.stringify(titles)
    })

    return storageData
}

export const addBookLocally = async (title, description, language, book, imageBase64) => {
    console.log("Fetching data...")
    var data = await Storage.getItem({ key: "data" })
    data = Array.from(JSON.parse(data))

    console.log("Fetching titles")
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
    titles[title] = data.length
    data.push(obj)

    console.log("setting data....")
    await Storage.setItem({
        key: "data",
        value: JSON.stringify(data)
    })

    console.log("setting titles...")
    await Storage.setItem({
        key: "titles",
        value: JSON.stringify(titles)
    })
}

export async function getFavBooks(full_data) {
    const favBooks = Array.from(
        JSON.parse(await Storage.getItem({ key: "favBooks" }))
    );
    if (full_data) {
        const data = Array.from(JSON.parse(await Storage.getItem({ key: "data" })));
        const titles = JSON.parse(await Storage.getItem({ key: "titles" }));
        if (favBooks) {
            var arr = [];
            favBooks.forEach((value, index) => {
                if (value in titles) {
                    arr.push(data[titles[value]]);
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

export async function getCompletedBooks(full_data) {
    const completedBooks = Array.from(
        JSON.parse(await Storage.getItem({ key: "completedBooks" }))
    );
    if (full_data) {
        const data = Array.from(JSON.parse(await Storage.getItem({ key: "data" })));
        const titles = JSON.parse(await Storage.getItem({ key: "titles" }));
        if (completedBooks) {
            var arr = [];
            completedBooks.forEach((value, index) => {
                if (value in titles) {
                    arr.push(data[titles[value]]);
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

    var ids = [];
    var datas = [];
    var arr = [];

    snapshot.forEach((doc) => {
        ids.push(doc.id);
        datas.push(doc.data());
    });

    for (var x = 0; x < ids.length; x++) {
        var dict = { ...datas[x], book: {} };

        const lenPages = dict.lenPages;

        // get collections data
        for (var i = 0; i < lenPages; i++) {
            const pageSnapshot = await firebase.firestore()
                .collection("BooksReview")
                .doc(ids[x])
                .collection("page" + (i + 1).toString())
                .doc((i + 1).toString())
                .get()
            dict.book["page" + (i + 1).toString()] = pageSnapshot.data()["value"]
        }

        // Set extra information
        dict["isAdmin"] = true;
        dict["id"] = ids[x];
        dict["lenPages"] = lenPages;
        arr.push(dict);
    }

    return arr
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
    setfavList(favBooks)
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

export async function uploadBook (item) {
    const collectionSelect = "BooksReview"
    let uid = firebase.auth()?.currentUser?.uid;
    const document = firebase.firestore().collection(collectionSelect).doc(item.title + " " + uid.toString())

    await document.set({ title: item.title, language: item.language, description: item.description, lenPages: Object.keys(item.book).length, source: item.source })

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

export async function acceptBook (item) {
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