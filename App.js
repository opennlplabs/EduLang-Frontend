import React, { Suspense, useEffect } from "react";
import { Text, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegistrationPage from "./Screens/RegistrationPage.js";
import HomeScreen from "./Screens/HomeScreen";
import { useFonts } from "expo-font";
import WelcomeScreenNew from "./Screens/WelcomeScreenNew";
import BookInfo from "./Screens/BookInfo.js";
import PDFExample from "./Screens/BookReader";
import LiveTranslation from "./Screens/LiveTranslation.js";
import Settings from "./Screens/Settings";
import * as firebase from "firebase/app";
import { firebaseConfig } from "./firebase.js";
import Splash from "./Screens/Splash.js";
import BookAddInfo from "./Screens/BookAddInfo.js"

LogBox.ignoreAllLogs();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setuser] = React.useState(false);

  let [fontsLoaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-BlackItalic": require("./assets/fonts/Roboto-BlackItalic.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setuser(true);
      }
    });
  }, []);

  if (!fontsLoaded) {
    return <Text> Loading ... </Text>;
  }

  return (
    <Suspense fallback="Loading...">
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen
            name="Welcome Screen"
            component={WelcomeScreenNew}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Registration Page" component={RegistrationPage} />
          <Stack.Screen name="Add Book: Info" component={BookAddInfo} />
          <Stack.Screen name="Live Translation" component={LiveTranslation} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Book Info" component={BookInfo} />
          <Stack.Screen name="Book Reader" component={PDFExample} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </Suspense>
  );
}
