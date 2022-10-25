import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal
} from "react-native";
import { SIZES } from "../constants";
import { AntDesign } from "@expo/vector-icons";
import Clickable from "./components/Clickable";
import { useTranslation } from "react-i18next";
import { useIsFocused } from "@react-navigation/native";
import { addToFav, getFavBooks, removeFromFav, setBookAsComplete, removeFromCompleted, uploadBook, removeFromData, acceptBook } from "./StorageUtils/BookStorage";

const BookInfo = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisable] = useState(false)
  const [favList, setfavList] = useState([]);
  const { item } = route.params;
  const isAdmin = Object.keys(item).includes("isAdmin")
  const [modalTitle, setModalTitle] = useState("")
  const isFocused = useIsFocused()

  // Get favorite list
  useEffect(async () => {
    if (isFocused) {
      setfavList(await getFavBooks(full_data = false))
    }
  }, [isFocused])

  const uploadBookMod = async () => {
    setModalVisable(true)
    setModalTitle("Uploading to Books Review...")

    await uploadBook(item)

    setModalVisable(false)
    navigation.navigate({
      name: "Home",
    })
  }

  // When admin decides to accept the book 
  const addToBooks = async () => {
    if (Object.keys(item.book).length === 0) {
      alert("You must read the book first before you submit!")
    }
    else {
      setModalTitle("Deleting From Books Review...")
      setModalVisable(true)

      await acceptBook(item)

      setModalVisable(false)

      navigation.navigate({
        name: "Home",
      })
    }
  }

  const deleteBook = async (item) => {
    await removeFromFav(item)
    await removeFromCompleted(item)
    await removeFromData(item)

    navigation.navigate("Home")
  }

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
              <TouchableOpacity onPress={async () => setfavList(await removeFromFav(item))}>
                <AntDesign name="heart" size={24} color="red" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={async () => setfavList(await addToFav(item))}>
                <AntDesign name="hearto" size={24} color="black" />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => uploadBookMod()}>
              <AntDesign style={{ marginLeft: 10 }} name="clouduploado" size={28} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteBook(item)}>
              <AntDesign style={{ marginLeft: 10, marginTop: 3 }} name="closecircleo" size={23} color="black" />
            </TouchableOpacity>
          </>}
        </View>
      </View>
      <View style={styles.loginButtons}>
        <Clickable
          text={t("book_info.start_reading")}
          onPress={() => navigation.navigate("Book Reader", { item: item })}
        />
        <Clickable text={"Complete Reading"} onPress={async () => await setBookAsComplete(item)} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalView}>
          <Text>{modalTitle}</Text>
          <View style={{ width: '100%', height: 20 }} />
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
