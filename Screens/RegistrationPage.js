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
} from "react-native";
import * as firebase from "firebase";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ModalPicker } from "./components/ModalPicker";
import { NavigationContainer } from "@react-navigation/native";
import SelectBox from "react-native-multi-selectbox";
import { useTranslation } from "react-i18next";

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
];

const Stack = createNativeStackNavigator();
const { width: WIDTH } = Dimensions.get("window");

const SignUpScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [grade, setGradeLevel] = useState("");
  const [username, setUsername] = useState("");

  const [chooseData, setChooseData] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nativelanguage, setNativeLanguage] = useState({});
  const [selectedTeams, setSelectedTeams] = useState([]);

  const handleRegister = async () => {
    try {
      await firebase
        .firestore()
        .collection("userInfo")
        .doc(firebase.auth().currentUser.uid)
        .set({
          phoneNumber: phoneNumber,
          grade: grade,
          username: username,
          nativeLanguage: nativelanguage,
        })
        .then(() => {
          navigation.replace("Home");
        });
    } catch (e) {
      console.log("registration page: ", e);
    }
  };

  const changeModalVisibility = (bool) => {
    setIsModalVisible(bool);
  };

  const setData = (option) => {
    setChooseData(option);
  };

  function onChange() {
    return (val) => setNativeLanguage(val);
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
        <TextInput
          style={styles.input}
          placeholder={t("reg.phone_number")}
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={(val) => setPhoneNumber(val)}
        />
        <View style={{ marginTop: 10 }}>
          <SelectBox
            label={t("settings.native_language")}
            options={K_OPTIONS}
            value={nativelanguage}
            onChange={onChange()}
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
      </ScrollView>

      <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 30 }}>
        <TouchableOpacity style={styles.loginBtn} onPress={handleRegister}>
          <Text>{t("reg.register")}</Text>
        </TouchableOpacity>
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
