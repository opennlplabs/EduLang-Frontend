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
  StatusBar,
} from "react-native";
import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import { getData } from "../constants/HomeConfig";
import BookList from "./components/BookList.js";
import LottieView from "lottie-react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import * as firebase from "firebase";
import FeedbackModal from "./components/FeedBackModal";
import { useIsFocused } from "@react-navigation/native";
import Svg from "react-native-svg";
import SvgComponent from "../assets/SvgComponent/Pattern";
import { Storage } from "expo-storage";
import axios from "axios";
import { server } from "./LiveTranslation";

const Home = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [loading, setloading] = useState(false);
  const [user, setuser] = useState({});
  const [nativeLanguage, setnativeLanguage] = useState({});
  const [translatedLanguage, setTranslatedLanguage] = useState({});
  const userEmail = "test@gmail.com";
  const [dismissLottie, setDismissLottie] = useState(false);
  const [completedBooks, setcompletedBooks] = useState([]);
  const [feedbackModal, setfeedbackModal] = useState(false);
  const [searchText, setsearchText] = useState("");
  const [favList, setfavList] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [data, setData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    setTimeout(() => {
      setDismissLottie(true);
    }, 2000);
  }, []);

  useEffect(() => {
    if (isFocused) {
      getData().then((value) => {
        setData(value);

        filterdata = data.filter(
          (item) => item.language == nativeLanguage.item
        );

        searchData = filterdata.filter((book) => {
          let text1 = searchText.toLowerCase();
          return searchText ? book.title.toLowerCase().includes(text1) : true;
        });
      });
    }
  }, [navigation, isFocused]);

  useEffect(async () => {
    // firebase
    //   .firestore()
    //   .collection("favBooks")
    //   .where("uid", "==", firebase.auth().currentUser.uid)
    //   .onSnapshot((snapshot) => {
    //     if (snapshot) {
    //       let arr = [];
    //       snapshot.forEach((book, index) => {
    //         arr.push(book.data());
    //       });
    //       setfavList(arr);
    //     }
    //   });
    const favBooks = Array.from(
      JSON.parse(await Storage.getItem({ key: "favBooks" }))
    );
    const completedBooks = Array.from(
      JSON.parse(await Storage.getItem({ key: "completedBooks" }))
    );
    const titles = JSON.parse(await Storage.getItem({ key: "titles" }));
    const data = Array.from(JSON.parse(await Storage.getItem({ key: "data" })));

    if (favBooks) {
      var arr = [];
      favBooks.forEach((value, index) => {
        if (value in titles) {
          arr.push(data[titles[value]]);
        }
      });
      setfavList(arr);
    }
    if (completedBooks) {
      var arr = [];
      completedBooks.forEach((value, index) => {
        if (value in titles) {
          arr.push(data[titles[value]]);
        }
      });
      setcompletedBooks(arr);
    }
  }, [data]);

  useEffect(async () => {
    setloading(true);
    
    firebase.auth().onAuthStateChanged(async (user) => {
      var needUpdatedTranslateLanguage = false
      if (user) {
        firebase
          .firestore()
          .collection("userInfo")
          .doc(firebase.auth().currentUser.uid)
          .onSnapshot(async (snapshot) => {
            if (snapshot) {
              setuser(snapshot.data());
              setnativeLanguage(snapshot.data()?.nativeLanguage);
              setTranslatedLanguage(snapshot.data()?.translatedLanguageConfig);
              setloading(false);
              setIsAdmin(snapshot.data()?.isAdmin);

              await Storage.setItem({
                key: "nativeLanguage",
                value: snapshot.data().nativeLanguage
              })
              try {           
                await Storage.setItem({
                  key: "translatedLanguage",
                  value: snapshot.data().translatedLanguageConfig
                })
              } catch (err) {
                console.log("Error caught")
                firebase
                .firestore()
                .collection("userInfo")
                .doc(firebase.auth().currentUser.uid)
                .set({
                  translatedLanguageConfig:{
                    id: 'EN',
                    item: "English",
                    label: "English"
                  },
                }, {merge: true})

                await Storage.setItem({
                  key: "translatedLanguage",
                  value: {
                    id: 'EN',
                    item: "English",
                    label: "English"
                  }
                })
              }
            }
          });

        if (needUpdatedTranslateLanguage) {
          console.log("Translated Language updated")
          
        }
      } else {
        setloading(false);
        navigation.replace("Welcome Screen");
      }
    });
  }, []);

  var filterdata = data.filter((item) => item.language == nativeLanguage.item);

  var searchData = filterdata.filter((book) => {
    let text1 = searchText.toLowerCase();
    return searchText ? book.title.toLowerCase().includes(text1) : true;
  });


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
            onChangeText={(text) => setsearchText(text)}
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

  // const renderScrollBar2 = () => {
  //   return (
  //     <View style={{ marginTop: 10 }}>
  //       <Image
  //         source={require("../assets/images/settingslogo2.png")}
  //         style={{ height: 25, width: 25, marginLeft: 16 }}
  //       />
  //       <BookList item={completedBooks} navigation={navigation} />
  //     </View>
  //   );
  // };

  const renderScrollBar3 = (title) => {
    return (
      <View style={{ marginTop: 5 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
        <BookList item={favList} navigation={navigation} />
      </View>
    );
  };

  useEffect(async () => {
    if (isFocused && isAdmin) {
      // get admin data
      const snapshot = await firebase
        .firestore()
        .collection("BooksReview")
        .get();

      var ids = [];
      var datas = [];
      var arr = [];

      snapshot.forEach((doc) => {
        ids.push(doc.id);
        datas.push(doc.data());
      });

      for (var x = 0; x < ids.length; x++) {
        var dict = { ...datas[x], book: {} };

        const lenPages = dict.lenPages;

        // get collections data
        // for (var i = 0; i < lenPages; i++) {
        //   const pageSnapshot = await firebase.firestore()
        //     .collection("BooksReview")
        //     .doc(ids[x])
        //     .collection("page" + (i + 1).toString())
        //     .doc((i + 1).toString())
        //     .get()
        //   dict.book["page" + (i + 1).toString()] = pageSnapshot.data()["value"]
        // }
        dict["isAdmin"] = true;
        dict["id"] = ids[x];
        dict["lenPages"] = lenPages;
        arr.push(dict);
      }
      setAdminData(arr);
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
              // showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{ marginHorizontal: 20, position: "absolute", top: 220 }}
            >
              {renderScrollBar(`${t("Featured Books")}`)}


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
