import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  SafeAreaView,
  Alert,
  TextInput,
  Modal,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as firebase from "firebase";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ModalPicker } from "./components/ModalPicker";
import { NavigationContainer } from "@react-navigation/native";
import SelectBox from "react-native-multi-selectbox";
import { useTranslation } from "react-i18next";
import { languageConfig, translatedLanguageConfig } from "../constants/HomeConfig";

const K_OPTIONS = [
  {
    item: "Pashto",
    id: "PS",
  },
  {
    item: "Xhosa",
    id: "XH",
  },
  {
    item: "Somali",
    id: "SO",
  },
  {
    item: "Ukranian",
    id: "UK",
  },
  {
    item: "Hindi",
    id: "HI",
  },
];

const Stack = createNativeStackNavigator();
const { width: WIDTH } = Dimensions.get("window");

const SignUpScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [grade, setGradeLevel] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setloading] = useState(false);
  const [chooseData, setChooseData] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nativelanguage, setNativeLanguage] = useState({});
  const [translatedLanguage, setTranslatedLanguage] = useState({})
  const [selectedTeams, setSelectedTeams] = useState([]);

  const authfromFirebase = async () => {
    if (nativeLanguage.id === translateLanguage.id) {
      alert("Native Language and Translated language must not the same")
      return
    }

    await Storage.setItem({ key: "nativeLanguage", value: JSON.stringify(nativeLanguage)})
    await Storage.setItem({ key: "translatedLanguage", value: JSON.stringify(translatedLanguage)})
    
    const { email, password } = route.params;
    setloading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((re) => {
        handleRegister();
      })
      .catch((re) => {
        setloading(false);

        switch (re.code) {
          case "auth/email-already-in-use":
            alert(`Email address ${email} already in use.`);
            break;
          case "auth/invalid-email":
            alert(`Email address ${email} is invalid.`);
            break;
          case "auth/weak-password":
            alert(
              "Password is not strong enough. Add additional characters including special characters and numbers."
            );
            break;
          default:
            alert("No errors!");
        }
      });
  };

  const handleRegister = async () => {
    try {
      await firebase
        .firestore()
        .collection("userInfo")
        .doc(firebase.auth().currentUser.uid)
        .set({
          grade: grade,
          username: username,
          nativeLanguage: nativelanguage,
          translatedLanguageConfig: translateLanguage
        })
        .then(() => {
          setloading(false);
          // navigation.replace("Home");
        });
    } catch (e) {
      setloading(false);
    }
  };

  const changeModalVisibility = (bool) => {
    setIsModalVisible(bool);
  };

  const setData = (option) => {
    setChooseData(option);
  };

  function onChange(nativeLanguage) {
    if (nativeLanguage === true) {
      return (val) => setNativeLanguage(val);
    } else {
      return (val) => setTranslatedLanguage(val);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.userInteractionContainer}>
        <TextInput
          style={styles.input}
          placeholder={t("reg.username")}
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={(val) => setUsername(val)}
        />
        <TextInput
          style={styles.input}
          placeholder={t("reg.grade_level")}
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={(val) => setGradeLevel(val)}
        />
        <View style={{ marginTop: 10 }}>
          <SelectBox
            label={t("settings.native_language")}
            options={languageConfig}
            value={nativelanguage}
            onChange={onChange(true)}
            hideInputFilter={false}
            containerStyle={{
              backgroundColor: "#808080",
              alignItems: "center",
              padding: 8,
              borderRadius: 4,
            }}
            labelStyle={{ color: "#6aa598", fontWeight: "bold" }}
            selectedItemStyle={{ color: "white", fontSize: 15 }}
            inputPlaceholder={t("reg.native_language")}
            arrowIconColor="white"
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <SelectBox
            label={t("settings.translated_language")}
            options={translatedLanguageConfig}
            value={translatedLanguage}
            onChange={onChange(false)}
            hideInputFilter={false}
            containerStyle={{
              backgroundColor: "#808080",
              alignItems: "center",
              padding: 8,
              borderRadius: 4,
            }}
            labelStyle={{ color: "#6aa598", fontWeight: "bold" }}
            selectedItemStyle={{ color: "white", fontSize: 15 }}
            inputPlaceholder={t("reg.translated_language")}
            arrowIconColor="white"
          />
        </View>
      </ScrollView>

      <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 30 }}>
        {loading ? (
          <ActivityIndicator size={"small"} color="white" />
        ) : (
          <TouchableOpacity style={styles.loginBtn} onPress={authfromFirebase}>
            <Text>{t("reg.register")}</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#808080",
    height: 35,
    padding: 8,
    borderRadius: 4,
    marginTop: 10,
    //color: COLORS.darkCoral,
  },
  loginBtn: {
    borderRadius: 4,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    //marginBottom: 200,
    backgroundColor: "#6aa598",
    marginHorizontal: 20,
  },
  dropdownMenu: {
    borderRadius: 4,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#808080",
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#B4CECB",
  },
  textf: {
    marginVertical: 20,
    fontSize: 20,
    color: "white",
  },
  userInteractionContainer: {
    //marginTop: 50,
    paddingHorizontal: 20,
    //flex: 1
    //width: WIDTH,
  },
});

export default SignUpScreen;
