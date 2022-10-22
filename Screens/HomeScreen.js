import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  StatusBar,
} from "react-native";
import { COLORS, FONTS } from "../constants";
import BookList from "./components/BookList.js";
import { AntDesign } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import FeedbackModal from "./components/FeedBackModal";
import axios from "axios";
import { server } from "./LiveTranslation";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Storage } from 'expo-storage'
import { getCompletedBooks, getFavBooks } from "./StorageUtils/BookStorage";

async function getStorage (key, array=false) {
  var val = JSON.parse(await Storage.getItem({key: key}))
  if (array === true) val = Array.from(val)
  return val
}

const Home = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [data, setData] = useState([])
  const [nativeLanguage, setNativeLanguage] = useState({})
  const [username, setUsername] = useState("")
  const [completedBooks, setCompletedBooks] = useState([])
  const [favBooks, setFavBooks] = useState([])
  const [isAdmin, setIsAdmin] = useState([])
  const [adminData, setAdminData] = useState([])
  const [searchData, setSearchData] = useState([])
  const [feedbackModal, setfeedbackModal] = useState(false);
  const isFocused = useIsFocused()

  useEffect(async () => {
    setCompletedBooks(await getCompletedBooks(true))
    setFavBooks(await getFavBooks(true))

    const data = await getStorage("data", true)
    setData(data)

    setUsername(await getStorage("username")) 

    const isAdmin = await getStorage("isAdmin")
    setIsAdmin(isAdmin)

    if (isAdmin === true) {
      setAdminData(await getStorage("AdminData", true))
    }
    
    setNativeLanguage(await getStorage("nativeLanguage"))
    updateSearchData(data, "")
  }, [isFocused])

  // Update search data
  function updateSearchData (dataFilter, text) {
    setSearchData(dataFilter.filter((book) => {
      let text1 = text.toLowerCase();
      return text ? book.title.toLowerCase().includes(text1) : true;
    }))
  }

  const renderAdmin = (title) => {
    if (isAdmin) {
      return (
        <View style={{ marginTop: 5 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
          <BookList item={adminData} navigation={navigation} NoMessage="No Admin Books found" />
        </View>
      );
    } else {
      return <></>;
    }
  };

  const test_request = async () => {
    const response = await axios({
      method: "post" ,
      url: `${server}/test`,
    })
    console.log("Test response:", JSON.parse(response.data["response"]))
  }

  const renderHeader = () => {
    return (
      <View style={{
        height: 180
      }}>
        {/* <SvgComponent /> */}
        <View
          style={{
            backgroundColor: "#4CA4D3",
            padding: 15,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            margin: 5,
            width: "90%",
            top: 100,
            position: "absolute",
            borderRadius: 6,
            justifyContent: "space-between",
          }}
        >

          <TextInput
            style={{ backgroundColor: "#4CA4D3", width: "90%", color: "white" }}
            placeholder="Search book"
            placeholderTextColor="white"
            onChangeText={(text) => {
              updateSearchData(data, text)
            }}
          />
          <AntDesign name="search1" size={24} color="white" />
        </View>
        <View
          style={{
            position: "absolute",
            top: 30,
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            paddingHorizontal: 20,
          }}
        >
          {/* Greetings */}
          <Text style={{ ...FONTS.h2, color: COLORS.black, flex: 1 }}>
            {`${t("home.welcome")} ${username} `}
          </Text>
          <TouchableOpacity onPress={() => setfeedbackModal(true)}>
            <Image
              source={require("../assets/images/feedbackIcon.png")}
              style={{ height: 25, width: 25, marginLeft: 16 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Image
              source={require("../assets/images/settingslogo2.png")}
              style={{ height: 25, width: 25, marginLeft: 16 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderScrollBar = (title) => {
    return (
      <View style={{ marginTop: 5 }}>
        <View
          style={{
            flex: 1,
            width: '100%',
            height: 35,
            position: "relative",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              marginTop: 5,
              fontSize: 20,
              fontWeight: "bold",
              width: "71%",
            }}
          >
            {title}
          </Text>
          <TouchableOpacity
            style={{
              position: "relative",
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              width: 50,
              padding: 7,
              backgroundColor: "#dbdbdb",
              borderRadius: 10,
            }}
            onPress={() =>
              navigation.navigate({
                name: "Add Book: Info",
                params: { language: nativeLanguage },
              })
            }
          >
            <AntDesign name="plus" size={24} color="black" />
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                marginTop: 2,
                paddingLeft: 3,
              }}
            >
              Add Book
            </Text>
          </TouchableOpacity>
          
        </View>
        <BookList item={searchData} navigation={navigation} NoMessage="No Books found!" />
      </View>
    );
  };
  const renderCompletedBooks = (title) => {
    return (
      <View style={{ marginTop: 5 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
        <BookList item={completedBooks} navigation={navigation} NoMessage="No completed books." />
      </View>
    );
  };

  const renderFavoriteBooks = (title) => {
    return (
      <View style={{ marginTop: 5 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
        <BookList item={favBooks} navigation={navigation} NoMessage="No favorite books."/>
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle={"dark-content"} backgroundColor={"green"} />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        {renderHeader()}

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginHorizontal: 20 }}
        >
          {renderScrollBar(`${t("Featured Books")}`)}
          {renderCompletedBooks(`Completed Books`)}
          {renderFavoriteBooks(`Favorite Books`)}
          {renderAdmin(`Books Review`)}
        </ScrollView>

        <FeedbackModal
          visible={feedbackModal}
          hideModal={() => setfeedbackModal(false)}
        />
      </SafeAreaView>
    </>
  );
};

export default Home;
