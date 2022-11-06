import AsyncStorage from "@react-native-async-storage/async-storage";

import { createContext, useEffect, useState } from "react";
import { getUserInfoFirebase } from "../Screens/StorageUtils/UserStorage";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  isAdmin: false,
  UserData: [],
  setUserData: (data) => {},
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  async function getStorage(key, array = false) {
    var val = JSON.parse(await Storage.getItem({ key: key }));
    if (array === true) val = Array.from(val);
    return val;
  }

  //Get UserInfo
  async function getUserInfo() {
    const [grade, nativeLanguage, translatedLanguage, username, isadmin] =
      await getUserInfoFirebase();
  }

  useEffect(async () => {
    const checkIsAdmin = await getStorage("isAdmin");
    isAuthenticated = true;
    if (true) {
      setIsAdmin(true);
    }
  }, []);

  // this functions are our setters
  // we can make this functions work later on
  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem("token", JSON.stringify(token));
    isAuthenticated = true;
  }
  function setUserData(data) {
    setUser(data);
    console.log("data user", data);
    AsyncStorage.setItem("user", JSON.stringify(data));
  }

  function logout() {
    isAuthenticated = false;
    AsyncStorage.removeItem("token");
    setAuthToken(null);
  }
  // data that we can get from the scope of our contex provider
  const value = {
    isAdmin,
    token: authToken,
    UserData: user,
    setUserData,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
