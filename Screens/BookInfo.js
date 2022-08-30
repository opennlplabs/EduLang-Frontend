import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
  Modal
} from "react-native";
import { Dimensions } from "react-native-web";
import { SIZES } from "../constants";
import { AntDesign } from "@expo/vector-icons";

import Clickable from "./components/Clickable";
import { useTranslation } from "react-i18next";
import * as firebase from "firebase";
import { Bar } from 'react-native-progress'
import { Storage } from 'expo-storage'
import { useIsFocused } from "@react-navigation/native";

function delay(delayInms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}

const BookInfo = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisable] = useState(false)
  const [completedBooks, setcompletedBooks] = useState([]);
  const [progress, setProgress] = useState(0)
  const [total, setTotal] = useState(1)
  const [favList, setfavList] = useState([]);
  const { item } = route.params;
  const isAdmin = Object.keys(item).includes("isAdmin")
  const [modalTitle, setModalTitle] = useState("")
  const isFocused = useIsFocused()

  useEffect(async () => {
    if (isFocused) {
      const completedBooks = JSON.parse(
        await Storage.getItem({ key: "completedBooks" })
      )
      if (completedBooks) setcompletedBooks(completedBooks)
      const favBooks = JSON.parse(
        await Storage.getItem({ key: "favBooks" })
      )
      if (favBooks) setfavList(favBooks)
    }
  }, [isFocused])

  const completeReading = async (item) => {
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
    setcompletedBooks(completedBooks)
  };

  const addtoFav = async (item) => {
    // console.log(item);
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
    setfavList(favBooks)
  };

  const removeFromFav = async (item) => {
    var favBooks = JSON.parse(
      await Storage.getItem({ key: "favBooks" })
    )
    for (var i = 0; i < favBooks.length; i++) {
      if (favBooks[i] == item.title) {
        favBooks.splice(i, 1)
        console.log("found index:", i)
        break
      }
    }

    await Storage.setItem({
      key: "favBooks",
      value: JSON.stringify(favBooks)
    })
    setfavList(favBooks)
  };

  const uploadBook = async () => {
    const collectionSelect = "BooksReview"
    setModalTitle("Uploading to Books Review...")
    setProgress(0)
    setTotal(Object.keys(item.book).length + 1)
    setModalVisable(true)
    let uid = firebase.auth()?.currentUser?.uid;
    const document = firebase.firestore().collection(collectionSelect).doc(item.title + " " + uid.toString())

    document.set({ title: item.title, language: item.language, description: item.description, source: item.source, lenPages: Object.keys(item.book).length })
    setProgress(1)

    for (var i = 0; i < Object.keys(item.book).length; i++) {
      setProgress(i + 1)
      const keySet = "page" + (i + 1).toString()
      await document.collection(keySet).doc((i + 1).toString()).set({ value: item.book[keySet] }).catch((e) => {
        alert(e)
        i = item.length
      })
      // To avoid writing too much at the same time :)
      await delay(1100)
    }

    setModalVisable(false)
    navigation.navigate({
      name: "Home",
    })
  }

  const addToBooks = async () => {
    if (Object.keys(item.book).length === 0) {
      alert("You must read the book first before you submit!")
    }
    else {
      console.log("Add to Books")
      const id = item["id"]
      const lenPages = item["lenPages"]

      setModalTitle("Deleting From Books Review...")
      setProgress(0)
      setTotal(Object.keys(item.book).length * 2 + 1)
      setModalVisable(true)

      // Then delete the data about the selected item
      for (var i = 0; i < lenPages; i++) {
        await firebase.firestore()
          .collection("BooksReview")
          .doc(id)
          .collection("page" + (i + 1).toString())
          .doc((i + 1).toString())
          .delete()
        setProgress(i)
      }
      await firebase.firestore().collection("BooksReview").doc(id).delete()

      // Then store new set into actual books
      setModalTitle("Uploading to Books...")
      const collectionSelect = "Books"
      let uid = firebase.auth()?.currentUser?.uid;
      const document = firebase.firestore().collection(collectionSelect).doc(item.title + " " + uid.toString())

      document.set({ title: item.title, language: item.language, description: item.description, source: item.source, lenPages: Object.keys(item.book).length })
      setProgress(lenPages)

      for (var i = 0; i < Object.keys(item.book).length; i++) {
        setProgress(lenPages + i + 1)
        const keySet = "page" + (i + 1).toString()
        await document.collection(keySet).doc((i + 1).toString()).set({ value: item.book[keySet] }).catch((e) => {
          alert(e)
          i = item.length
        })
        // To avoid writing too much at the same time :)
        await delay(1100)
      }

      setModalVisable(false)

      navigation.navigate({
        name: "Home",
      })
    }
  }

  const loadPages = async () => {
    if (isAdmin === true && Object.keys(item.book).length === 0) {
      const id = item["id"]
      const lenPages = item["lenPages"]

      setProgress(0)
      setTotal(lenPages)
      setModalTitle("Loading Pages...")
      setModalVisable(true)

      for (var i = 0; i < lenPages; i++) {
        const pageSnapshot = await firebase.firestore()
          .collection("BooksReview")
          .doc(id)
          .collection("page" + (i + 1).toString())
          .doc((i + 1).toString())
          .get()
        item.book["page" + (i + 1).toString()] = pageSnapshot.data()["value"]
        setProgress(i)
      }

      setModalVisable(false)
    }
    navigation.navigate("Book Reader", { item: item })
  }

  // console.log("fav list ", favList);

  // console.log("item on bt i", item);
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image
          source={{ uri: item.source }}
          style={{ height: 350, width: SIZES.width, resizeMode: "contain" }}
        />
        <Text>Description: {item.description}</Text>
        <View
          style={{
            alignSelf: "flex-end",
            flexDirection: "row",
            paddingHorizontal: 15,
          }}
        >
          {isAdmin ? <>
            <TouchableOpacity>
              <AntDesign name="check" size={24} onPress={addToBooks} />
            </TouchableOpacity>
          </> : <>
            {favList.some((book) => book === item.title) ? (
              <TouchableOpacity onPress={() => removeFromFav(item)}>
                <AntDesign name="heart" size={24} color="red" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => addtoFav(item)}>
                <AntDesign name="hearto" size={24} color="black" />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => uploadBook()}>
              <AntDesign style={{ marginLeft: 10 }} name="clouduploado" size={28} color="black" />
            </TouchableOpacity>
          </>}
        </View>
      </View>
      <View style={styles.loginButtons}>
        <Clickable
          text={t("book_info.start_reading")}
          onPress={loadPages}
        />
        <Clickable text={"Complete Reading"} onPress={() => completeReading(item)} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalView}>
          <Text>{modalTitle}</Text>
          <View style={{ width: '100%', height: 20 }} />
          <Bar progress={progress / total} />
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 10,
  },
  contentContainer: {
    flex: 1,

    alignItems: "center",
    marginTop: 5,
  },
  buttonContainer: {
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  loginButtons: {
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  modalView: {
    margin: 20,
    marginTop: 60,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});
export default BookInfo;
