import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import * as firebase from "firebase";
import { useState } from "react";
import { getUserInfoFirebase, logoutUserFirebase } from "./StorageUtils/UserStorage";
import { Storage } from "expo-storage";
import { getAdminBooks, getBookData, getCloudBookFromId, getCloudBookFromTitle, getFirebaseTitles, getLocalStorageBook, getNewTitlesFromCloud, updateFromCloud } from "./StorageUtils/BookStorage";

async function setStorage(key, value, print = true) {
  value = JSON.stringify(value)
  if (value == undefined || key == undefined) {
    throw "Value " + value.toString() + " has an undefined key."
  }

  if (print) {
    console.log("===================================================")
    console.log("Expo storage key =", key)
    console.log("Expo storage value =", value)
    console.log("===================================================")
  }
  await Storage.setItem({
    key: key,
    value: value
  })
}

const Splash = ({ navigation }) => {
  const [text, setText] = useState("Waiting for Authentication...")

  React.useEffect(() => {
    setTimeout(() => {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) navigation.replace("Tabs");
        else navigation.replace("Welcome Screen");
      });
    }, 3000);
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size={"large"} />
      <Text style={{ marginTop: 20, textAlign: 'center', paddingLeft: 20, paddingRight: 20 }}>{text}</Text>
    </View>
  );
};
export default Splash;