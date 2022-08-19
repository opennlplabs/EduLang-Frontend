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
} from "react-native";
import { Dimensions } from "react-native-web";
import { SIZES } from "../constants";
import { AntDesign } from "@expo/vector-icons";

import Clickable from "./components/Clickable";
import { useTranslation } from "react-i18next";
import * as firebase from "firebase";
const BookInfo = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [completedBooks, setcompletedBooks] = useState([]);
  const [favList, setfavList] = useState([]);
  const { item } = route.params;
  // console.log(route.params);

  useEffect(() => {
    firebase
      .firestore()
      .collection("favBooks")
      .where("uid", "==", firebase.auth().currentUser.uid)
      .onSnapshot((snapshot) => {
        if (snapshot) {
          let arr = [];
          // console.log(snapshot);
          snapshot.forEach((book, index) => {
            // console.log(book.data());
            arr.push(book.data());
          });
          // console.log("after database", arr);
          setfavList(arr);
        }
      });
  }, [favList]);

  const completeReading = async () => {
    let uid = firebase.auth()?.currentUser?.uid;
    firebase
      .firestore()
      .collection("completedBooks")
      .add({ ...item, uid })
      .then(() => {
        alert("book completed");
        navigation.goBack();
      })
      .catch((err) => {
        alert(err);
      });

    // let arr = completedBooks ? completedBooks : [];
    // if (arr.includes(item.title)) {
    //   return;
    // } else {
    //   arr.push(item);
    //   await AsyncStorage.setItem("userCompletedBooks", JSON.stringify(arr));
    //   navigation.goBack();
    // }
    // console.log(item);
  };

  const addtoFav = (item) => {
    // console.log(item);
    let uid = firebase.auth()?.currentUser?.uid;
    firebase
      .firestore()
      .collection("favBooks")
      .add({ ...item, uid })
      .then(() => {
        alert("added to fav");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const removeFromFav = () => {
    console.log("removing from fav");
    firebase
      .firestore()
      .collection("favBooks")

      .where("uid", "==", firebase.auth().currentUser.uid)
      .onSnapshot((snapshot) => {
        if (snapshot) {
          snapshot.forEach((book) => {
            console.log(book.id);
            if (book.data().bookId == item.bookId) {
              firebase.firestore().collection("favBooks").doc(book.id).delete();
              console
                .log("deleted")
                .then(() => {
                  alert("removed from fav");
                })
                .catch((err) => {
                  alert(JSON.stringify(err));
                });
            } else {
              return;
            }
          });
        }
      });
  };

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
          {favList.some((book) => book.bookId === item.bookId) ? (
            <TouchableOpacity onPress={removeFromFav}>
              <AntDesign name="heart" size={24} color="red" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => addtoFav(item)}>
              <AntDesign name="hearto" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.loginButtons}>
        <Clickable
          text={t("book_info.start_reading")}
          onPress={() => navigation.navigate("Book Reader", { item: item })}
        />
        <Clickable text={"Complete Reading"} onPress={completeReading} />
      </View>
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
});
export default BookInfo;
