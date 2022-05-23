import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TextInput,
  Dimensions,
} from "react-native";
import LoginBackground from "../assets/images/EduLangOfficial.png";
import logo from "../assets/images/RealEduLangLogo.png";
import { COLORS } from "../constants/theme";
import i18n from "../locale";
import * as firebase from "firebase";
import Clickable from "./components/Clickable";
import { useTranslation } from "react-i18next";

const { width: WIDTH } = Dimensions.get("window");

const WelcomeScreenNew = ({ navigation }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = () => {
    navigation.navigate("Registration Page", { email, password });
  };

  const handleLogin = () => {
    // make if statement here for changing the language
    //important for changing into another language
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((re) => {
        console.log(re);
        i18n.changeLanguage("en");
        navigation.replace("Home");
      })
      .catch((re) => {
        switch (re.code) {
          case "auth/wrong-password":
            setErrorMessage("You have entered an incorrect password.");
            break;
        }
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={LoginBackground}
        style={styles.backgroundContainer}
      >
        <Image source={logo} style={styles.logo} />

        <Text style={styles.logoText}>EduLang</Text>
        <Text style={styles.bodyText}>{t("general.appSubstring")}</Text>

        <View style={styles.userInteractionContainer}>
          <TextInput
            style={styles.input}
            placeholder={t("general.email")}
            placeholderTextColor={COLORS.white_70}
            underlineColorAndroid="transparent"
            value={email}
            onChangeText={(text) => {
              setErrorMessage("");
              setEmail(text);
            }}
          />

          <TextInput
            style={[styles.input, { marginTop: 20 }]}
            placeholder={t("general.password")}
            value={password}
            onChangeText={(text) => {
              setErrorMessage("");
              setPassword(text);
            }}
            secureTextEntry={true}
            placeholderTextColor={"rgba(255,255,255,0.7)"}
            underlineColorAndroid="transparent"
          />

          <Clickable
            text={t("general.login")}
            containerStyle={{ marginTop: 20 }}
            textStyle={{ color: "black", fontSize: 15 }}
            onPress={handleLogin}
          />
          <Clickable
            text={t("general.sign_up")}
            containerStyle={{ marginTop: 20 }}
            textStyle={{ color: "black", fontSize: 15 }}
            onPress={handleSignUp}
          />

          <Text>{errorMessage}</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    alignItems: "center",
    //justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  logoText: {
    color: COLORS.darkCoral,
    fontSize: 40,
    fontWeight: "500",
    fontFamily: "Roboto-Black",
  },
  bodyText: {
    fontSize: 18,
    color: "#2d8078", //change to lighter coral later
  },
  input: {
    backgroundColor: "#808080",
    height: 35,
    padding: 8,
    borderRadius: 4,
    //color: COLORS.darkCoral,
  },
  userInteractionContainer: {
    marginTop: 50,
    paddingHorizontal: 20,
    flex: 1,
    width: WIDTH,
  },
});

export default WelcomeScreenNew;
