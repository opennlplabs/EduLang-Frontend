import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import RadioButtonRN from "radio-buttons-react-native";
import {
  languageConfig,
  gradeConfig,
  translatedLanguageConfig,
} from "./../constants/HomeConfig";
import Clickable from "./components/Clickable";
import i18n from "../locale";
import { useTranslation } from "react-i18next";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import { Storage } from "expo-storage";
import SelectBox from "react-native-multi-selectbox";

const Settings = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [gradeLevel, setGradeLevel] = useState(0);
  const [nativelanguage, setnativeLanguage] = useState({});
  const [translatedlanguage, setTranslatedLanguage] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("userInfo")
          .doc(firebase.auth().currentUser.uid)
          .onSnapshot((snapshot) => {
            if (snapshot) {
              console.log("Settings snapshot: ", snapshot.data());
              setGradeLevel(snapshot.data().grade);
              setnativeLanguage(snapshot.data()?.nativeLanguage);
              setTranslatedLanguage(snapshot.data()?.translatedLanguageConfig);
            }
          });
      }
    });
  }, []);

  const UpdateLang = async () => {
    console.log(translatedlanguage);
    // if (translatedlanguage.id !== nativelanguage.id) {
    console.log("_-----------------------UPDATE_++");
    console.log(nativelanguage, translatedlanguage);
    console.log("_-----------------------UPDATE_++");
    await Storage.setItem({
      key: "nativeLanguage",
      value: JSON.stringify(nativelanguage),
    });
    // await Storage.setItem({
    //   key: "translatedLanguage",
    //   value: JSON.stringify(translatedlanguage),
    // });

    let uid = firebase.auth()?.currentUser?.uid;
    firebase
      .firestore()
      .collection("userInfo")
      .doc(uid)
      .update({
        grade: gradeLevel,
        nativeLanguage: nativelanguage,
        // translatedLanguageConfig: translatedlanguage,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
    // } else {
    //   alert(
    //     "The translated language and your native language cannot be the same!"
    //   );
    // }
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.replace("Welcome Screen");
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.paddingBottomText}>
          {t("settings.native_language")}
        </Text>
        {/* <RadioButtonRN
          data={languageConfig}
          selectedBtn={(e) => {
            //i18n.changeLanguage(e.label)
            setnativeLanguage(e);
          }}
        />
        <View style={{ marginTop: 0 }}>
          <SelectBox
            label=""
            // label={t("settings.native_language")}
            options={languageConfig}
            value={nativelanguage}
            onChange={(e) => setnativeLanguage(e)}
            hideInputFilter={false}
            containerStyle={{
              backgroundColor: "#808080",
              alignItems: "center",
              padding: 10,
              borderRadius: 4,
            }}
            labelStyle={{ color: "#4CA4D3", fontWeight: "bold" }}
            selectedItemStyle={{ color: "white", fontSize: 15 }}
            inputPlaceholder={t("reg.native_language")}
            arrowIconColor="white"
          />
        </View>
        <Text style={styles.paddingBottomText}>
          {t("settings.grade_level")}
        </Text>
        <RadioButtonRN
          data={gradeConfig}
          selectedBtn={(e) => setGradeLevel(e.label)}
        />
      </ScrollView> 
       
      <View style={styles.loginButtons}>
        <Clickable text={t("general.save")} onPress={UpdateLang} />
        <Clickable text={"Logout"} onPress={logout} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  loginButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  paddingBottomText: {
    marginTop: 20,
    fontSize: 15,
  },
});

export default Settings;
