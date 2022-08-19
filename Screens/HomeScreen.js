import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import { getData } from "../constants/HomeConfig";
import BookList from "./components/BookList.js";
import LottieView from "lottie-react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import * as firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FeedbackModal from "./components/FeedBackModal";
const Home = ({ navigation }) => {
  const { t } = useTranslation();
  const [loading, setloading] = useState(false);
  const [user, setuser] = useState({});
  const [nativeLanguage, setnativeLanguage] = useState({});
  const userEmail = "test@gmail.com";
  const [dismissLottie, setDismissLottie] = useState(false);
  const [completedBooks, setcompletedBooks] = useState([]);
  const [feedbackModal, setfeedbackModal] = useState(false);
  const [searchText, setsearchText] = useState("");
  const [favList, setfavList] = useState([]);
  const [data, setData] = useState([])

  let userlnaguage = "Somali";

  useEffect(() => {
    setTimeout(() => {
      setDismissLottie(true);
    }, 2000);
  }, []);

  useEffect(() => {
    getData().then((value) => {
      setData(value)
    })
  }, [navigation])

  useEffect(() => {
    getCompletedBooks();
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection("favBooks")
      .where("uid", "==", firebase.auth().currentUser.uid)
      .onSnapshot((snapshot) => {
        if (snapshot) {
          let arr = [];
          snapshot.forEach((book, index) => {
            // console.log(book.data());
            arr.push(book.data());
          });
          // console.log("after database", arr);
          setfavList(arr);
        }
      });
  }, []);

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
    setloading(true);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("userInfo")
          .doc(firebase.auth().currentUser.uid)
          .onSnapshot((snapshot) => {
            if (snapshot) {
              setuser(snapshot.data());
              setnativeLanguage(snapshot.data()?.nativeLanguage);
              setloading(false);
            }
          });
      } else {
        setloading(false);
        navigation.replace("Welcome Screen");
      }
    });
  }, []);

  const filterdata = data.filter(
    (item) => item.language == nativeLanguage.item
  );

  const searchData = filterdata.filter((book) => {
    let text1 = searchText.toLowerCase();
    return searchText ? book.title.toLowerCase().includes(text1) : true;
  });

  const renderHeader = () => {
    return (
      <View>
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
        <View
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
        </View>
      </View>
    );
  };

  const renderScrollBar = (title) => {
    return (
      <View style={{ marginTop: 5 }}>
        <View style={{ flex: 1, height: 35, position: 'relative', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{ fontSize: 20, fontWeight: "bold", width: '71%'}}>{title}</Text>
          <TouchableOpacity style={{position: 'relative', flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: 50, padding: 7, backgroundColor: '#dbdbdb', borderRadius: 10}} 
          onPress={() => navigation.navigate({name: "Add Book: Info", params: {language: nativeLanguage}})}>
            <AntDesign name="plus" size={24} color="black" />
            <Text style={{fontSize: 12, fontWeight: "bold", marginTop: 2, paddingLeft: 3}}>Add Book</Text>
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
            {renderScrollBar3(`Favorite Books`)}
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
