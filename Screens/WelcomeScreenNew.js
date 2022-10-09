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
  TouchableOpacity,
} from "react-native";
import logo from "../assets/images/RealEduLangLogo.png";
import { COLORS } from "../constants/theme";
import i18n from "../locale";
import Clickable from "./components/Clickable";
import { useTranslation } from "react-i18next";
import { loginEmailPassword } from "./StorageUtils/UserStorage";

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
    loginEmailPassword(email, password).then(() => {
      i18n.changeLanguage("en");
      navigation.replace("Home");
    }).catch((error) => {
      setErrorMessage(error);
    })
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={styles.backgroundContainer}
      >
        <View>
          <Image
            resizeMode="cover"
            style={{ height: 150, width: 400 }}
            source={require("../assets/wave1.png")}
          />
        </View>

        <View style={styles.subHeader}>
          <View style={{ paddingHorizontal: 15, width: "50%" }}>
            <Text style={[styles.logoText, { color: "#93CB54" }]}>
              Edu<Text style={{ color: "#4CA4D3" }}>Lang</Text>
            </Text>
            <Text style={styles.bodyText}>{t("general.appSubstring")}</Text>
          </View>
          <View>
            <Image source={logo} style={styles.logo} />
          </View>
        </View>

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
          <TouchableOpacity
            style={[styles.buttonStyle]}
            onPress={handleSignUp}>
          <Text style = {{fontSize:15}}>Sign Up</Text>
          </TouchableOpacity>

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
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  logoText: {
    color: COLORS.darkCoral,
    fontSize: 40,
    // fontWeight: "500",
    fontFamily: "Inter-V",
  },
  bodyText: {
    fontSize: 18,
    width: 230,
    color: "black", //change to lighter coral later
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
  subHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
  },
  buttonStyle: {
    borderRadius: 4,
    padding: 10,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a9d576",
    // marginHorizontal: 20,
  },
});

export default WelcomeScreenNew;
