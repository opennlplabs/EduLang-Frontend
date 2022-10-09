import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import SelectBox from "react-native-multi-selectbox";
import { useTranslation } from "react-i18next";
import { languageConfig } from "../constants/HomeConfig";
import { createUser, setUserInfo } from "./StorageUtils/UserStorage";

const SignUpScreen = ({ route }) => {
  const { t } = useTranslation();
  const [grade, setGradeLevel] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setloading] = useState(false);
  const [nativelanguage, setNativeLanguage] = useState({});

  const authfromFirebase = async () => {
    const { email, password } = route.params;
    setloading(true);
    
    await createUser(email, password).then(() => {
      handleRegister();
    }).catch((err_msg) => {
      setloading(false);
      alert(err_msg)
    })
  };

  const handleRegister = async () => {
    // undefined is translated language, but it will not actually be set to undefined (it just won't be set/changed)
    setUserInfo(nativeLanguage, undefined, grade, username).then(() => {
      setloading(false)
    }).catch((e) => {
      alert("Error: "+e)
      setloading(false)
    })
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
        <View style={{ marginTop: 10 }}>
          <SelectBox
            label={t("settings.native_language")}
            options={languageConfig}
            value={nativelanguage}
            onChange={onChange()}
            hideInputFilter={false}
            containerStyle={{
              backgroundColor: "#808080",
              alignItems: "center",
              padding: 8,
              borderRadius: 4,
            }}
            labelStyle={{ color: "#4CA4D3", fontWeight: "bold" }}
            selectedItemStyle={{ color: "white", fontSize: 15 }}
            inputPlaceholder={t("reg.native_language")}
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
    backgroundColor: "#93CB54",
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
    backgroundColor: "#FFFFFF",
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
