import React, { Suspense, useEffect } from "react";
import { Text, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./Screens/HomeScreen";
import { useFonts } from "expo-font";
import WelcomeScreenNew from "./Screens/WelcomeScreen";
import BookInfo from "./Screens/BookInfo.js";
import PDFExample from "./Screens/BookReader";
import LiveTranslation from "./Screens/LiveTranslation.js";
import Settings from "./Screens/Settings";
import * as firebase from "firebase/app";
import { firebaseConfig } from "./firebase.js";
import Splash from "./Screens/Splash.js";
import BookAddInfo from "./Screens/BookAddInfo.js";
import { AdminPage } from "./Screens/AdminPage.js";
import CustomTranslation from "./Screens/CustomTranslation.js";
import { Library } from "./Screens/Library.js";
import { Ionicons } from "@expo/vector-icons";
import { AddPDF } from "./Screens/AddPDF.js";
import { NativeBaseProvider } from 'native-base'

LogBox.ignoreAllLogs();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const HomeScreenStack = createNativeStackNavigator();
function HomeNavigator() {
  return (
    <HomeScreenStack.Navigator>
      <HomeScreenStack.Screen name="Home Screen" component={HomeScreen} />
      <HomeScreenStack.Screen name="Add Book: Info" component={BookAddInfo} />
      <HomeScreenStack.Screen name="Live Translation" component={LiveTranslation} />
      <HomeScreenStack.Screen name="Custom Translation" component={CustomTranslation} />
      <HomeScreenStack.Screen name="Book Info" component={BookInfo} />
      <HomeScreenStack.Screen name="Book Reader" component={PDFExample} />
    </HomeScreenStack.Navigator>
  )
}

const LibraryScreenStack = createNativeStackNavigator()
function LibraryNavigator() {
  return (
    <LibraryScreenStack.Navigator>
      <LibraryScreenStack.Screen name="Library Home Page" component={Library} />
      <LibraryScreenStack.Screen name="Book Info" component={BookInfo} />
      <LibraryScreenStack.Screen name="Book Reader" component={PDFExample} />
    </LibraryScreenStack.Navigator>
  )
}

const AdminScreenStack = createNativeStackNavigator()
function AdminNavigator() {
  return (
    <AdminScreenStack.Navigator>
      <AdminScreenStack.Screen name="Admin Page" component={AdminPage} />
      <AdminScreenStack.Screen name="Add Book: Info" component={BookAddInfo} />
      <AdminScreenStack.Screen name="Add PDF" component={AddPDF} />
    </AdminScreenStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();
function TabNavigator(props) {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') iconName = "home-outline"
        else if (route.name === "Library") iconName = "library-outline"
        else if (route.name === 'Settings') iconName = "cog-outline";
        else if (route.name === "Admin") iconName = "lock-closed-outline"

        return <Ionicons name={iconName} size={size} color={color} />;
      }
    })}>
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Library" component={LibraryNavigator} />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="Admin" component={AdminNavigator} />
    </Tab.Navigator>
  )
}

const SignupStack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-BlackItalic": require("./assets/fonts/Roboto-BlackItalic.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <Text> Loading ... </Text>;
  }

  return (
    <Suspense fallback="Loading...">
      <NativeBaseProvider>
        <NavigationContainer>
          <SignupStack.Navigator screenOptions={{
            headerShown: false
          }}>
            <SignupStack.Screen name="Splash" component={Splash} />
            <SignupStack.Screen name="Welcome Screen" component={WelcomeScreenNew} options={{ headerShown: false }} />
            <SignupStack.Screen name="Tabs" component={TabNavigator} />
          </SignupStack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Suspense>
  );
}
