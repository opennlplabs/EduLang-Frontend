import React, { useState } from "react";
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
import Clickable from "./components/Clickable";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as firebase from "firebase";
const BookInfo = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [completedBooks, setcompletedBooks] = useState([]);
  const { item } = route.params;
  console.log(route.params);

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

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image
          source={{ uri: item.source }}
          style={{ height: 350, width: SIZES.width, resizeMode: "contain" }}
        />
        <Text>Description: {item.description}</Text>
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
