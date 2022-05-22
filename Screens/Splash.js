import React from "react";
import { View, ActivityIndicator } from "react-native";
import * as firebase from "firebase";
const Splash = ({ navigation }) => {
  React.useEffect(() => {
    setTimeout(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
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
    </View>
  );
};
export default Splash;
