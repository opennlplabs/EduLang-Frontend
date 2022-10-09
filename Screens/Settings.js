import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import RadioButtonRN from "radio-buttons-react-native";
import { gradeConfig } from "../constants/LanguageConfig";
import { languageConfig } from "../constants/LanguageConfig";
import Clickable from "./components/Clickable";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import SelectBox from "react-native-multi-selectbox";
import * as firebase from "firebase";
import { getUserInfoFirebase, logoutUser, logoutUserFirebase, setUserInfo } from "./StorageUtils/UserStorage";

const Settings = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [gradeLevel, setGradeLevel] = useState(0);
  const [nativelanguage, setnativeLanguage] = useState({});
  const [translatedlanguage, setTranslatedLanguage] = useState({});

  useEffect(async () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const [grade, nativeLanguage, translatedLanguageConfig, username, isAdmin] = await getUserInfoFirebase() 
        setGradeLevel(grade)
        setnativeLanguage(nativeLanguage)
        setTranslatedLanguage(translatedLanguageConfig)
      }
    });
  }, []);

  const SaveInfo = async () => {
    if (translatedlanguage.id == nativelanguage.id) {
      alert("The translated language and the native language cannot be the same!")
    }
    else {
      await setUserInfo(
        nativelanguage,
        translatedlanguage,
        gradeLevel,
        undefined
      )

      navigation.goBack()
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.paddingBottomText}>
          {t("settings.native_language")}
        </Text>
        <View style={{ marginTop: 0 }}>
          <SelectBox
            label=""
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
        <Clickable text={t("general.save")} onPress={SaveInfo} />
        <Clickable text={"Logout"} onPress={() => {logoutUserFirebase().then(() => {navigation.replace("Welcome Screen");})}} />
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
