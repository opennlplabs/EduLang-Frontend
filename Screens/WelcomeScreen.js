import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  SafeAreaView,
  Alert,
  TextInput,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import logo from "../assets/images/RealEduLangLogo.png";
import LoginBackground from "../assets/images/EduLangOfficial.png";
import * as firebase from "firebase";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const { width: WIDTH } = Dimensions.get("window");
export function WelcomeScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((re) => {
        console.log(re);
        navigation.navigate("Registration Page");
      })
      .catch((re) => {
        switch (re.code) {
          case "auth/email-already-in-use":
            setErrorMessage("Email in use");
            console.log(`Email address ${this.state.email} already in use.`);
            break;
          case "auth/invalid-email":
            console.log(`Email address ${this.state.email} is invalid.`);
            break;
          case "auth/weak-password":
            console.log(
              "Password is not strong enough. Add additional characters including special characters and numbers."
            );
            break;
          default:
            console.log(error.message);
            break;
        }
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(email, password)
      .then((re) => {
        console.log(re);
        navigation.replace("Home");
      })
      .catch((re) => {
        console.log(re);
      });
  };

  return (
    <ImageBackground
      source={LoginBackground}
      style={styles.backgroundContainer}
    >
      <View style={styles.LogoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>

      <View style={styles.LogoTextContainer}>
        <Text style={styles.LogoText}>EduLang</Text>
      </View>

      <View style={styles.bodyTextContainer}>
        <Text style={styles.bodyText}>
          Bridging the language gap through stories
        </Text>
      </View>

      <View style={styles.UsernamePasswordContainer}>
        <TextInput
          style={styles.input}
          placeholder={"Email"}
          placeholderTextColor={"rgba(255,255,255,0.7)"}
          underlineColorAndroid="transparent"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder={"Password"}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          placeholderTextColor={"rgba(255,255,255,0.7)"}
          underlineColorAndroid="transparent"
        />
      </View>

      <View style={styles.ButtonContainer}>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} onPress={handleSignUp}>
          <Text>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    alignItems: "center",
    justifyContent: "center",
  },
  LogoContainer: {
    alignItems: "center",
    flex: 1.25,
    //borderColor: "red",
    //borderWidth: 1,
  },
  logo: {
    width: 100,
    height: 100,
  },
  LogoText: {
    color: "#ff1c1c",
    fontSize: 50,
    fontWeight: "500",
    fontFamily: "Roboto-Black",
    alignItems: "center",
    justifyContent: "center",
  },
  LogoTextContainer: {
    flex: 1,
    //borderColor: "blue",
    //borderWidth: 1,
  },

  UsernamePasswordContainer: {
    flex: 1,
    //borderColor: "purple",
    //borderWidth: 1,
  },

  ButtonContainer: {
    flex: 3,
    //borderColor: "green",
    //borderWidth: 1,
  },
  input: {
    width: WIDTH - 55,
    height: 25,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: "rgba(0,0,0,0.35)",
    color: "rgba(255,255,255,0.7)",
    marginHorizontal: 25,
    marginTop: 10,
  },
  loginBtn: {
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#6aa598",
    alignSelf: "stretch",
  },
  bodyText: {
    fontSize: 18,
    fontFamily: "GujaratiSangamMN-Bold",
    color: "#2d8078",
  },
  bodyTextContainer: {
    flex: 0.5,
    //borderColor: "brown",
    //borderWidth: 1,
  },
});
