import React, { useState } from "react";
import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  Input,
  Pressable,
  Stack,
  Text,
  FormControl,
  Select,
  View,
  ScrollView,
} from "native-base";
import { StatusBar, Image, Dimensions } from "react-native";
import BookList from "./components/BookList.js";
import FeedbackModal from "./components/FeedBackModal";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Storage } from "expo-storage";
import {
  delay,
  getCompletedBooks,
  getFavBooks,
  getLocalStorageBook,
} from "./StorageUtils/BookStorage";
import { Header } from "./components/Header";
import { HeaderSection } from "./components/HeaderSection.js";
import { getUserInfoFirebase } from "./StorageUtils/UserStorage.js";
import { useTranslation } from "react-i18next";
import Background from "./components/Background.js";

async function setStorage(key, value) {
  value = JSON.stringify(value);
  if (value == undefined || key == undefined) {
    throw "Value " + value.toString() + " has an undefined key.";
  }

  await Storage.setItem({
    key: key,
    value: value,
  });
}

export async function getStorage(key, array = false) {
  var val = JSON.parse(await Storage.getItem({ key: key }));
  if (array === true) val = Array.from(val);
  return val;
}

const Home = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [completedBooks, setCompletedBooks] = useState([]);
  const [favBooks, setFavBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [feedbackModal, setfeedbackModal] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const firstRenderFunc = async () => {
      // Get information
      const [grade, nativeLanguage, translatedLanguage, username, isadmin] =
        await getUserInfoFirebase();
      // Set storage values for trade and translated langu
      await setStorage("grade", grade);
      await setStorage("translatedLanguage", translatedLanguage);

      // set native lang and useState var
      await setStorage("nativeLanguage", nativeLanguage);

      // set username and useState var
      await setStorage("username", username);
      setUsername(await getStorage("username"));

      // set isAdmin and useState var
      await setStorage("isAdmin", isadmin);

      setIsAdmin(isAdmin);

      // Get local storage book and set as data
      var [bookData, titlesData] = await getLocalStorageBook();
      setData(bookData);

      // Get completed books and favorite books off of this.
      setCompletedBooks(await getCompletedBooks(bookData, titlesData, true));
      setFavBooks(await getFavBooks(bookData, titlesData, true));

      updateSearchData(data, "");

      setIsLoading(false);
    };
    if (isFocused)
      firstRenderFunc();
  }, [isFocused]);

  // Update search data
  function updateSearchData(dataFilter, text) {
    setSearchData(
      dataFilter.filter((book) => {
        let text1 = text.toLowerCase();
        return text ? book.title.toLowerCase().includes(text1) : true;
      })
    );
  }
  const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

  return (
    <Box bg="tertiary.100" flex={1}>
      {/* <Image
        resizeMode="cover"
        style={{ height: HEIGHT * 0.18, width: WIDTH, position: "absolute" }}
        source={require("../assets/wave1.png")}
      /> */}
      <Background />

      {/* <ScrollView my="1/6">
        <StatusBar
          style={{ marginTop: 10, backgroundColor: "red" }}
          barStyle={"dark-content"}
          backgroundColor={"green"}
        /> */}

      <Header
        title={`${t("home.welcome")} ${username}`}
        onSearchBarChange={(text) => updateSearchData(data, text)}
        onFeedbackPress={() => setfeedbackModal(true)}
      />
      <HeaderSection
        title="Books"
        buttonTitle="Add Book"
        onButtonClick={() => {
          navigation.navigate({
            name: "Add Book: Info",
            params: { navigateTo: "Live Translation" },
          });
        }}
      />
      <BookList
        item={searchData}
        navigation={navigation}
        NoMessage="No books found. Add a book from library or add a custom book!"
        isLoading={isLoading}
      />

      <FeedbackModal
        visible={feedbackModal}
        hideModal={() => setfeedbackModal(false)}
      />
      {/* </ScrollView> */}
    </Box>
  );
};

export default Home;
