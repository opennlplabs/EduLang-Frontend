import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import { data } from "../constants/HomeConfig";
import BookList from "./components/BookList.js";
import LottieView from "lottie-react-native";
import { useTranslation } from "react-i18next";
import * as firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FeedbackModal from "./components/FeedBackModal";
const Home = ({ navigation }) => {
  const { t } = useTranslation();

  const [user, setuser] = useState({});
  const [nativeLanguage, setnativeLanguage] = useState({});
  const userEmail = "test@gmail.com";
  const [dismissLottie, setDismissLottie] = useState(false);
  const [completedBooks, setcompletedBooks] = useState([]);
  const [feedbackModal, setfeedbackModal] = useState(false);
  let userlnaguage = "Somali";

  useEffect(() => {
    setTimeout(() => {
      setDismissLottie(true);
    }, 2000);
  }, []);

  useEffect(() => {
    getCompletedBooks();
  }, [completedBooks]);

  const getCompletedBooks = async () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("completedBooks")
          .where("uid", "==", firebase.auth().currentUser.uid)
          .onSnapshot((snapshot) => {
            if (snapshot) {
              let arr = [];
              snapshot.forEach((book, index) => {
                console.log(book.data());
                arr.push(book.data());
              });
              setcompletedBooks(arr);
            }
          });
      }
    });
    // try {
    //   const CmBooks = await AsyncStorage.getItem("userCompletedBooks");
    //   setcompletedBooks(JSON.parse(CmBooks));
    //   // console.log("Completed books==>", CmBooks);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("userInfo")
          .doc(firebase.auth().currentUser.uid)
          .onSnapshot((snapshot) => {
            if (snapshot) {
              setuser(snapshot.data());
              setnativeLanguage(snapshot.data().nativeLanguage);
              console.log(snapshot.data());
            }
          });
      } else {
        navigation.replace("Welcome Screen");
      }
    });
  }, []);

  const filterdata = data.filter(
    (item) => item.language == nativeLanguage.item
  );
  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
          paddingHorizontal: 20,
        }}
      >
        {/* Greetings */}
        <Text style={{ ...FONTS.h2, color: COLORS.black, flex: 1 }}>
          {`${t("home.welcome")} ${user.username} `}
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
    );
  };

  const renderScrollBar = (title) => {
    return (
      <View style={{ marginTop: 5 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
        <BookList item={filterdata} navigation={navigation} />
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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {!dismissLottie ? (
        <LottieView
          source={require("../assets/images/lottie1.json")}
          autoPlay
          style={{ justifyContent: "center", alignItems: "center" }}
        />
      ) : (
        <>
          {renderHeader()}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginHorizontal: 20 }}
          >
            {renderScrollBar(`${t("home.library")}`)}
            {/* {renderScrollBar("Reccomended Books")}
           {renderScrollBar("Latest Books")} */}
          </ScrollView>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginHorizontal: 20 }}
          >
            {renderScrollBar2(`Completed Books`)}
            {/* {renderScrollBar("Reccomended Books")}
           {renderScrollBar("Latest Books")} */}
          </ScrollView>
        </>
      )}

      <FeedbackModal
        visible={feedbackModal}
        hideModal={() => setfeedbackModal(false)}
      />
    </SafeAreaView>
  );
};

export default Home;
