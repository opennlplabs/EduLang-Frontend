import React, { Suspense, useEffect, useContext, useState } from "react";
import { Text, LogBox, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
import { NativeBaseProvider } from "native-base";
import { Icon } from "native-base";
import AuthContextProvider, { AuthContext } from "./context/authContext";
import { Storage } from "expo-storage";

async function getStorage(key, array = false) {
  var val = JSON.parse(await Storage.getItem({ key: key }));
  if (array === true) val = Array.from(val);
  return val;
}

LogBox.ignoreAllLogs();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const HomeScreenStack = createNativeStackNavigator();
function HomeNavigator() {
  return (
    <HomeScreenStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#10b981",
        },
        headerTintColor: "#fff", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
        },
      }}
    >
      <HomeScreenStack.Screen
        options={{ headerShown: false, orientation: 'portrait' }}
        name="Home Screen" component={HomeScreen} />
      <HomeScreenStack.Screen
        options={{ headerShown: false, orientation: 'portrait' }}
        name="Add Book: Info" component={BookAddInfo} />
      <HomeScreenStack.Screen
        options={{ orientation: 'portrait' }}
        name="Live Translation"
        component={LiveTranslation}
      />
      <HomeScreenStack.Screen
        name="Custom Translation"
        options={{ headerShown: false, orientation: 'portrait' }}
        component={CustomTranslation}
      />
      <HomeScreenStack.Screen options={{ orientation: 'portrait' }} name="Book Info" component={BookInfo} />
      <HomeScreenStack.Screen name="Book Reader" component={PDFExample} />
    </HomeScreenStack.Navigator>
  );
}

const LibraryScreenStack = createNativeStackNavigator();
function LibraryNavigator() {
  return (
    <LibraryScreenStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#10b981",
        },
        headerTintColor: "#fff", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
        },
      }}
    >
      <LibraryScreenStack.Screen
        name="Library Home Page"
        options={{ headerShown: false, orientation: 'portrait' }}
        component={Library}
      />
      <LibraryScreenStack.Screen name="Book Info" component={BookInfo} options={{ orientation: 'portrait' }} />
      <LibraryScreenStack.Screen name="Book Reader" component={PDFExample} />
    </LibraryScreenStack.Navigator>
  );
}

const AdminScreenStack = createNativeStackNavigator();
function AdminNavigator() {
  return (
    <AdminScreenStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#10b981",
        },
        headerTintColor: "#fff", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
        },
      }}
    >
      <AdminScreenStack.Screen name="Admin Page" component={AdminPage} options={{ orientation: 'portrait' }} />
      <AdminScreenStack.Screen name="Add Book: Info" component={BookAddInfo} options={{ orientation: 'portrait' }} />
      <AdminScreenStack.Screen name="Add PDF" component={AddPDF} options={{ orientation: 'portrait' }} />
    </AdminScreenStack.Navigator>
  );
}
//style for the tabBarContainer
const tabBar = {
  borderRadius: 100,
  position: "absolute",
  zIndex: 3,
  height: Dimensions.get("window").height * 0.1,
  backgroundColor: "#0ea5e9",
  marginBottom: 18,
  shadowOpacity: 0.6,
  opacity: 0.7,
};

const Tab = createBottomTabNavigator();
function TabNavigator(props) {
  const [isAdmin, setIsAdmin] = useState(false);
  // Would need to be tested with an actual admin account
  useEffect(() => {
    const checkIsAdmin = async () => {
      const isAdmin = await getStorage("isAdmin");
      setIsAdmin(isAdmin);
    };
    checkIsAdmin();
  }, [isAdmin]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarHideOnKeyboard: true,
        tabBarStyle: tabBar,

        headerStyle: {
          backgroundColor: "#047857",
        },
        tabBarIconStyle: {
          paddingTop: 0,
          paddingBottom: 0,
        },
        tabBarLabelStyle: {
          paddingTop: 0,
        },

        headerTintColor: "#fff", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
        },
        tabBarInactiveTintColor: "#ffff",
        tabBarActiveTintColor: "#4ade80",

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") iconName = "home";
          else if (route.name === "Library") iconName = "library";
          else if (route.name === "Settings") iconName = "cog";
          else if (route.name === "Admin") iconName = "lock-closed";

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={focused ? "#4ade80" : "#fff"}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Library" component={LibraryNavigator} />
      {isAdmin && <Tab.Screen name="Admin" component={AdminNavigator} />}
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
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
      <AuthContextProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            <SignupStack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <SignupStack.Screen name="Splash" component={Splash} />
              <SignupStack.Screen
                name="Welcome Screen"
                component={WelcomeScreenNew}
                options={{ headerShown: false }}
              />
              <SignupStack.Screen name="Tabs" component={TabNavigator} />
            </SignupStack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </AuthContextProvider>
    </Suspense>
  );
}
