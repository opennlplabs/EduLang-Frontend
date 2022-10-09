import React, { useEffect, useState } from "react";
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
import LottieView from "lottie-react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import * as firebase from "firebase";
import FeedbackModal from "./components/FeedBackModal";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { server } from "./LiveTranslation";
import { getAdminBooks, getBookData, getCompletedBooks, getFavBooks } from "./StorageUtils/BookStorage";
import { getUserInfoFirebase } from "./StorageUtils/UserStorage";

const Home = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [loading, setloading] = useState(false);
  const [username, setUsername] = useState({});
  const [nativeLanguage, setnativeLanguage] = useState({});
  const [searchData, setSearchData] = useState({})
  const [completedBooks, setcompletedBooks] = useState([]);
  const [feedbackModal, setfeedbackModal] = useState(false);
  const [favList, setfavList] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [data, setData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const isFocused = useIsFocused();

  // Lottie
  useEffect(() => {
    setTimeout(() => {
      setDismissLottie(true);
    }, 2000);
  }, []);


  // Get books & favlist & completed books
  useEffect(() => {
    if (isFocused) {
      getBookData(nativeLanguage.item).then((value) => {
        setData(value);
        setSearchData(filterdata.filter((book) => {
          let text1 = searchText.toLowerCase();
          return searchText ? book.title.toLowerCase().includes(text1) : true;
        }));
      }).then(async () => {
          setfavList(await getFavBooks(true))
          setcompletedBooks(await getCompletedBooks(true))
      })
    }
  }, [navigation, isFocused]);

  // Get user info
  useEffect(async () => {
    setloading(true);
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const [grade, nativeLanguage, translatedLanguage, username, isAdmin] = await getUserInfoFirebase()
        setUsername(username)
        setnativeLanguage(nativeLanguage)
        setTranslatedLanguage(translatedLanguage)
        setIsAdmin(isAdmin)
        setloading(false)
      } else {
        setloading(false);
        navigation.replace("Welcome Screen");
      }
    });
  }, []);

  // Update search data
  function updateSearchData (text) {
    setSearchData(data.filter((book) => {
      let text1 = text.toLowerCase();
      return text ? book.title.toLowerCase().includes(text1) : true;
    }))
  }

  // Get admin data
  useEffect(async () => {
    if (isFocused && isAdmin) {
      // get admin data
      setAdminData(await getAdminBooks());
    }
  }, [isAdmin, isFocused]);

  const renderAdmin = (title) => {
    if (isAdmin) {
      return (
        <View style={{ marginTop: 5 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
          <BookList item={adminData} navigation={navigation} />
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
      <View>
        {/* <SvgComponent /> */}
        <View>
          <Image
            style={{ height: 425 }}
            source={require("../assets/gradient.png")}
          />
        </View>

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
            onChangeText={(text) => {updateSearchData(text)}}
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
        {/* <View
          style={{
            backgroundColor: "#eee",
            padding: 15,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            margin: 5,
            width: "90%",
            borderRadius: 6,
            justifyContent: "space-between",
          }}
        >
          <TextInput
            style={{ backgroundColor: "#eee", width: "90%" }}
            placeholder="Search book"
            onChangeText={(text) => setsearchText(text)}
          />
          <AntDesign name="search1" size={24} color="black" />
        </View> */}
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
        <BookList item={searchData} navigation={navigation} />
      </View>
    );
  };
  const renderScrollBar2 = (title) => {
    return (
      <View style={{ marginTop: 5 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
        <BookList item={completedBooks} navigation={navigation} />
      </View>
    );
  };

  const renderScrollBar3 = (title) => {
    return (
      <View style={{ marginTop: 5 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
        <BookList item={favList} navigation={navigation} />
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

        {loading ? (
          <LottieView
            source={require("../assets/images/lottie1.json")}
            autoPlay
            style={{ justifyContent: "center", alignItems: "center" }}
          />
        ) : (
          <>
            {renderHeader()}

            <ScrollView
              showsHorizontalScrollIndicator={false}
              style={{ marginHorizontal: 20, position: "absolute", top: 220 }}
            >
              {renderScrollBar(`${t("Featured Books")}`)}
            </ScrollView>


            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ marginHorizontal: 20 }}
            >
              {renderScrollBar2(`Completed Books`)}
              {renderScrollBar3(`Favorite Books`)}

              {renderAdmin(`Books Review`)}
            </ScrollView>
          </>
        )}

        <FeedbackModal
          visible={feedbackModal}
          hideModal={() => setfeedbackModal(false)}
        />
      </SafeAreaView>
    </>
  );
};

export default Home;
