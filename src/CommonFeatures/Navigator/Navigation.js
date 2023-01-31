import React, {Suspense, useEffect, useContext, useState} from 'react';
import {
  LogBox,
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text, Icon, Center, VStack} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//import HomeScreen from './Screens/HomeScreen';
//import { useFonts } from "expo-font";
//import WelcomeScreenNew from './Screens/WelcomeScreen';

// import PDFExample from "./Screens/BookReader";
// import LiveTranslation from "./Screens/LiveTranslation.js";
// import Settings from "./Screens/Settings";
// import * as firebase from "firebase/app";
// import { firebaseConfig } from "./firebase.js";
// import Splash from "./Screens/Splash.js";
// import BookAddInfo from "./Screens/BookAddInfo.js";
// import { AdminPage } from "./Screens/AdminPage.js";
// import CustomTranslation from "./Screens/CustomTranslation.js";
// import { Library } from "./Screens/Library.js";
// import { Ionicons } from "@expo/vector-icons";
// import { AddPDF } from "./Screens/AddPDF.js";
import {NativeBaseProvider} from 'native-base';
// import { Icon } from "native-base";
// import AuthContextProvider, { AuthContext } from "./context/authContext";
// import { Storage } from "expo-storage";

import Home from '../../Containers/Home/Containers/Home';
import Library from '../../Containers/Library/Containers/Library';
import BookInfo from '../../Containers/Library/Containers/BookInfo';
import Admin from '../../Containers/Admin/Containers/Admin';
import Settings from '../../Containers/Settings/Containers/Settings';
import Login from '../../Containers/Auth/Containers/Login';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// async function getStorage(key, array = false) {
//   var val = JSON.parse(await Storage.getItem({key: key}));
//   if (array === true) {
//     val = Array.from(val);
//   }
//   return val;
// }

// // if (!firebase.apps.length) {
// //   firebase.initializeApp(firebaseConfig);
// // }

// const HomeScreenStack = createNativeStackNavigator();
// function HomeNavigator() {
//   return (
//     <HomeScreenStack.Navigator
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: '#10b981',
//         },
//         headerTintColor: '#fff', //Set Header text color
//         headerTitleStyle: {
//           fontWeight: 'bold', //Set Header text style
//         },
//       }}
//     >
//       <HomeScreenStack.Screen
//         options={{headerShown: false, orientation: 'portrait'}}
//         name="Home Screen"
//         component={HomeScreen}
//       />
//       <HomeScreenStack.Screen
//         options={{headerShown: false, orientation: 'portrait'}}
//         name="Add Book: Info"
//         component={BookAddInfo}
//       />
//       <HomeScreenStack.Screen
//         options={{orientation: 'portrait'}}
//         name="Live Translation"
//         component={LiveTranslation}
//       />
//       <HomeScreenStack.Screen
//         name="Custom Translation"
//         options={{headerShown: false, orientation: 'portrait'}}
//         component={CustomTranslation}
//       />
//       <HomeScreenStack.Screen
//         options={{orientation: 'portrait'}}
//         name="Book Info"
//         component={BookInfo}
//       />
//       <HomeScreenStack.Screen name="Book Reader" component={PDFExample} />
//     </HomeScreenStack.Navigator>
//   );
// }

const LibraryScreenStack = createNativeStackNavigator();
function LibraryNavigator() {
  return (
    <LibraryScreenStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#10b981',
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}
    >
      <LibraryScreenStack.Screen
        name="Library Home Page"
        options={{headerShown: false, orientation: 'portrait'}}
        component={Library}
      />
      <LibraryScreenStack.Screen
        name="Book Info"
        component={BookInfo}
        options={{orientation: 'portrait'}}
      />
      <LibraryScreenStack.Screen name="Book Reader" component={PDFExample} />
    </LibraryScreenStack.Navigator>
  );
}

// const AdminScreenStack = createNativeStackNavigator();
// function AdminNavigator() {
//   return (
//     <AdminScreenStack.Navigator
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: '#10b981',
//         },
//         headerTintColor: '#fff', //Set Header text color
//         headerTitleStyle: {
//           fontWeight: 'bold', //Set Header text style
//         },
//       }}
//     >
//       <AdminScreenStack.Screen
//         name="Admin Page"
//         component={AdminPage}
//         options={{orientation: 'portrait'}}
//       />
//       <AdminScreenStack.Screen
//         name="Add Book: Info"
//         component={BookAddInfo}
//         options={{orientation: 'portrait'}}
//       />
//       <AdminScreenStack.Screen
//         name="Add PDF"
//         component={AddPDF}
//         options={{orientation: 'portrait'}}
//       />
//     </AdminScreenStack.Navigator>
//   );
// }
// //style for the tabBarContainer
// const tabBar = {
//   borderRadius: 100,
//   position: 'absolute',
//   zIndex: 3,
//   height: Dimensions.get('window').height * 0.1,
//   backgroundColor: '#0ea5e9',
//   marginBottom: 18,
//   shadowOpacity: 0.6,
//   opacity: 0.7,
// };

// const Tab = createBottomTabNavigator();
// function TabNavigator(props) {
//   const [isAdmin, setIsAdmin] = useState(false);
//   // Would need to be tested with an actual admin account
//   useEffect(() => {
//     const checkIsAdmin = async () => {
//       const isAdmin = await getStorage('isAdmin');
//       setIsAdmin(isAdmin);
//     };
//     checkIsAdmin();
//   }, [isAdmin]);

//   return (
//     <Tab.Navigator
//       screenOptions={({route}) => ({
//         headerShown: false,

//         tabBarHideOnKeyboard: true,
//         tabBarStyle: tabBar,

//         headerStyle: {
//           backgroundColor: '#047857',
//         },
//         tabBarIconStyle: {
//           paddingTop: 0,
//           paddingBottom: 0,
//         },
//         tabBarLabelStyle: {
//           paddingTop: 0,
//         },

//         headerTintColor: '#fff', //Set Header text color
//         headerTitleStyle: {
//           fontWeight: 'bold', //Set Header text style
//         },
//         tabBarInactiveTintColor: '#ffff',
//         tabBarActiveTintColor: '#4ade80',

//         tabBarIcon: ({focused, color, size}) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = 'home';
//           } else if (route.name === 'Library') {
//             iconName = 'library';
//           } else if (route.name === 'Settings') {
//             iconName = 'cog';
//           } else if (route.name === 'Admin') {
//             iconName = 'lock-closed';
//           }

//           return (
//             <Ionicons
//               name={iconName}
//               size={size}
//               color={focused ? '#4ade80' : '#fff'}
//             />
//           );
//         },
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeNavigator} />
//       <Tab.Screen name="Library" component={LibraryNavigator} />
//       {isAdmin && <Tab.Screen name="Admin" component={AdminNavigator} />}
//       <Tab.Screen
//         name="Settings"
//         component={Settings}
//         options={{headerShown: false}}
//       />
//     </Tab.Navigator>
//   );
// }

// const SignupStack = createNativeStackNavigator();

export function App() {
  //   let [fontsLoaded] = useFonts({
  //     'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
  //     'Roboto-BlackItalic': require('./assets/fonts/Roboto-BlackItalic.ttf'),
  //     'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  //   });

  //   if (!fontsLoaded) {
  //     return <Text> Loading ... </Text>;
  //   }

  return (
    <Suspense fallback="Loading...">
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
              options={{headerShown: false}}
            />
            <SignupStack.Screen name="Tabs" component={TabNavigator} />
          </SignupStack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Suspense>
  );
}

const TabIcon = ({name, size, color, tabBarLabel}) => {
  return (
    <Center>
      <Icon as={Ionicons} name={name} size={size} color={color} />
      <Text mt="1.5" color={color}>
        {tabBarLabel}
      </Text>
    </Center>
  );
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerStyle: {
          backgroundColor: 'black',
          borderBottomColor: 'red',
        },
        tabBarIconStyle: {
          paddingTop: 0,
          paddingBottom: 0,
        },
        tabBarLabelStyle: {
          paddingTop: 0,
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
        tabBarInactiveTintColor: '#ffff',
        tabBarStyle: {
          position: 'absolute',
          borderRadius: 100,

          height: 85,
          backgroundColor: '#0ea5e9',
          marginBottom: 18,

          shadowOpacity: 0.6,
          opacity: 0.5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <TabIcon
              name="home"
              tabBarLabel="Home"
              size={size}
              color={focused ? '#4ade80' : '#ffff'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <TabIcon
              name="library"
              tabBarLabel="Library"
              size={size}
              color={focused ? '#4ade80' : '#ffff'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Admin"
        component={Admin}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <TabIcon
              name="lock-closed"
              tabBarLabel="Admin"
              size={size}
              color={focused ? '#4ade80' : '#ffff'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <TabIcon
              tabBarLabel="Settings"
              name="cog"
              size={size}
              color={focused ? '#4ade80' : '#ffff'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  const isAuth = true;

  return (
    <NavigationContainer>
      {isAuth ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Tabs"
            component={BottomTabs}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
