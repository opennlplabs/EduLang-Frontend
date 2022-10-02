import { Asset } from "expo-asset";
import { Storage } from 'expo-storage'
import * as FileSystem from 'expo-file-system'
import * as firebase from "firebase";

export const getData = async () => {
  var clear = false
  if (clear === true) {
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
    return []
  }

  var storageData = await Storage.getItem({ key: "data" })
  if (storageData == undefined) storageData = []
  else storageData = Array.from(JSON.parse(storageData))

  var titles = await Storage.getItem({ key: "titles" })
  if (titles == undefined) titles = {}
  else titles = JSON.parse(titles)

  const snapshot = await firebase.firestore().collection("Books").get()
  var ids = []
  var datas = []

  snapshot.forEach((doc) => {
    if (!(doc.data().title in titles)) {
      ids.push(doc.id)
      datas.push(doc.data())
    }
  })

  for (var x = 0; x < ids.length; x++) {
    var title = datas[x].title
    if (title in titles) {
      ids.splice(x)
      datas.splice(x)
    }
  }

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

  const defaultData = [
    {
      bookId: 0,
      title: "Decisions Pashto",
      language: "Pashto",
      description: "A village community makes a decision to change their lives",
      source: Asset.fromModule(
        require("../assets/images/bookCovers/disagreementAmongOccupations_cover.png")
      ).uri,
      book: require("../assets/bookpdf/pashto/DecisionsBookPashtoTranslation.json"),
    },
    {
      bookId: 1,
      title: "Decisions Ukrainian",
      language: "Ukrainian",
      description: "A village community makes a decision to change their lives",
      source: Asset.fromModule(
        require("../assets/images/bookCovers/disagreementAmongOccupations_cover.png")
      ).uri,
      book: require("../assets/bookpdf/ukrainian/Decisions Book Ukrainian Translation.json")
    },
    {
      bookId: 2,
      title: "Decisions Somali",
      language: "Somali",
      description: "A village community makes a decision to change their lives",
      source: Asset.fromModule(
        require("../assets/images/bookCovers/disagreementAmongOccupations_cover.png")
      ).uri,
      book: require("../assets/bookpdf/somali/Decisions Book Somali Translation.json"),
    },
    {
      bookId: 3,
      title: "Decisions Xhosa",
      language: "Xhosa",
      description: "A village community makes a decision to change their lives",
      source: Asset.fromModule(
        require("../assets/images/bookCovers/disagreementAmongOccupations_cover.png")
      ).uri,
      book: require("../assets/bookpdf/xhosa/Decisions Book Xhosa Translation.json"),
    },
    {
      bookId: 4,
      title: "Goat Dog Cow Pashto",
      language: "Pashto",
      description:
        "Three friends go on a journey in a taxi. When it comes time to pay, problems arise.",
      source: Asset.fromModule(
        require("../assets/images/bookCovers/GoatCoverPashto.png")
      ).uri,
      book: require("../assets/bookpdf/pashto/GoatDogCowBookPashto.json")
    },
    {
      bookId: 5,
      title: "Goat Dog Cow Hindi",
      language: "Hindi",
      description:
        "Three friends go on a journey in a taxi. When it comes time to pay, problems arise.",
      source: Asset.fromModule(
        require("../assets/images/bookCovers/goatDogandCow_cover.png")
      ).uri,
      book: require("../assets/bookpdf/hindi/GoatDogCowBookHindi.json")
    },
    {
      bookId: 6,
      title: "Goat Dog Cow Ukrainian",
      language: "Ukrainian",
      description:
        "Three friends go on a journey in a taxi. When it comes time to pay, problems arise.",
      source: Asset.fromModule(
        require("../assets/images/bookCovers/goatDogandCow_cover.png")
      ).uri,
      book: require("../assets/bookpdf/ukrainian/GoatDogCowBookUkrainian.json")
    },
    {
      bookId: 7,
      title: "Goat Dog Cow Somali",
      language: "Somali",
      description:
        "Three friends go on a journey in a taxi. When it comes time to pay, problems arise.",
      source: Asset.fromModule(
        require("../assets/images/bookCovers/goatDogandCow_cover.png")
      ).uri,
      book: require("../assets/bookpdf/somali/GoatDogCowBookSomali.json")
    },
    {
      bookId: 8,
      title: "Friends",
      language: "Pashto",
      description: "Friends Book",
      source: Asset.fromModule(
        require("../assets/images/bookCovers/FriendsCoverPashto.png")
      ).uri,
      book: require("../assets/bookpdf/pashto/Friends_Pashto_Final_Translation.json")
    },
    {
      bookId: 9,
      title: "Friends Somali",
      language: "Somali",
      description: "Simo makes new friends",
      source: Asset.fromModule(
        require("../assets/images/bookCovers/friends_cover.png")
      ).uri,
      book: require("../assets/bookpdf/somali/Friends_Somali_Final_Translation.json")
    },
    {
      bookId: 10,
      title: "Friends Xhosa",
      language: "Xhosa",
      description: "Simo makes new friends",
      source: Asset.fromModule(
        require("../assets/images/bookCovers/friends_cover.png")
      ).uri,
      book: require("../assets/bookpdf/xhosa/Friends_Xhosa_Final_Translation.json")
    },
    {
      bookId: 11,
      title: "Friends Hindi",
      language: "Hindi",
      description: "Simo makes new friends",
      source: Asset.fromModule(
        require("../assets/images/bookCovers/friends_cover.png")
      ).uri,
      book: require("../assets/bookpdf/hindi/Friends_Hindi_Final_Translation.json")
    },
  ];

  return storageData
}

export const addData = async (title, description, language, book, imageBase64) => {
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
  console.log(data)
  console.log(JSON.stringify(data))
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

export const languageConfig = [
  {
    id: "SO",
    item: "Somali",
    label: "Somali",
  },
  {
    id: "XH",
    item: "Xhosa",
    label: "Xhosa",
  },
  {
    id: "PS",
    item: "Pashto",
    label: "Pashto",
  },
  {
    id: "UK",
    item: "Ukrainian",
    label: "Ukrainian",
  },
  {
    id: "HI",
    item: "Hindi",
    label: "Hindi",
  },
  {
    id: "TE",
    item: "Telugu",
    label: "Telugu",
  },
  {
    id: "TW",
    item: "Twi",
    label: "Twi",
  },
];

export const gradeConfig = [
  {
    label: "1",
  },
  {
    label: "2",
  },
  {
    label: "3",
  },
  {
    label: "4",
  },
  {
    label: "5",
  },
];
