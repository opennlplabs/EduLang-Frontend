import React from "react";
import { View, ActivityIndicator, Text} from "react-native";
import * as firebase from "firebase";
import { useState } from "react";
import { getUserInfoFirebase } from "./StorageUtils/UserStorage";
import { Storage } from "expo-storage";
import { getAdminBooks, getBookData, getCloudBookFromId, getCloudBookFromTitle, getFirebaseTitles, getLocalStorageBook, getNewTitlesFromCloud, updateFromCloud } from "./StorageUtils/BookStorage";

async function setStorage (key, value, print=true) {
  value = JSON.stringify(value)
  if (value == undefined || key == undefined) {
    throw "Value " + value.toString() + " has an undefined key."
  }

  if (print) {
    console.log("===================================================")
    console.log("Expo storage key =",key)
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
        if (user) {
          setText("Getting User Information...")
          const [grade, nativeLanguage, translatedLanguage, username, isAdmin] = await getUserInfoFirebase()
          
          await setStorage("grade", grade)
          await setStorage("nativeLanguage", nativeLanguage)
          await setStorage("translatedLanguage", translatedLanguage)
          await setStorage("username", username)
          await setStorage("isAdmin", isAdmin)

          setText("Getting Local Book Information...")
          var [bookData, titlesData] = await getLocalStorageBook(nativeLanguage)
          console.log("Local book titles",titlesData)

          setText("Fetching Cloud book database...")
          const [newTitles, ids] = await getNewTitlesFromCloud(titlesData, nativeLanguage)
          console.log("New book titles", newTitles)

          // For every book in cloud, get information
          for (var i = 0; i < newTitles.length; i++) {
            setText(`Progress: ${i+1}/${ids.length} books\nGetting book information ${newTitles[i]} from cloud...`)
            bookData.push(await getCloudBookFromId(ids[i]))
            titlesData.push(newTitles[i])
          }
          await setStorage("data", bookData, false)
          await setStorage("titles", titlesData)

          // Get admin data
          if (isAdmin === true) {
            setText("Getting admin data...")
            await setStorage("AdminData", await getAdminBooks(), false)
          }

          setText("Done. Redirecting to Home Page...")
          navigation.replace("Home");
        } else {
          navigation.replace("Welcome Screen");
        }
      });
    }, 3000);
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size={"large"} />
      <Text style={{marginTop: 20, textAlign: 'center', paddingLeft: 20, paddingRight: 20}}>{text}</Text>
    </View>
  );
};
export default Splash;