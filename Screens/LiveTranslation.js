import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Camera } from "expo-camera";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { addData } from "../constants/HomeConfig";
import { StackActions } from "@react-navigation/native";

// **************************** SERVER INFORMATION ****************************
export const server = "http://10.0.0.132:5000/";
// **************************** SERVER INFORMATION ****************************

const LiveTranslation = ({ navigation, route }) => {
  const [images, setImages] = useState([]);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraPreview, setCameraPreview] = useState(false);
  const [TranslateTitle, setTranslateTitle] = useState("Translate");
  var camera;

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      // do something
      setCameraPreview(true);
    } else {
      Alert.alert("Access denied");
    }
  };

  const __deletePicture = async (index) => {
    var copy = [...images];
    copy.splice(index, 1);
    setImages(copy);
  };

  const __takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync({ base64: true });
    var copy = [...images];
    copy.push(photo);
    setImages(copy);
    setCameraPreview(false);
  };

  const TranslatePages = async () => {
    const customTranslate = route.params?.customTranslated;
    const originalImage = images[0].base64;
    var bookArray = {};

    if (customTranslate && images.length > 0) {
      //* Custom Translated
      navigation.navigate({
        name: "Custom Translation",
        params: {
          images: images,
          title: route.params?.title,
          description: route.params?.description,
          language: route.params?.language["item"],
        },
      });
      return;
    }

    for (var i = 0; i < images.length; i++) {
      const element = images[i];
      setTranslateTitle("Sending Page #" + (i + 1).toString() + "...");
      const form = new FormData();

      form.append("base64Image", element.base64);
      form.append("languageId", route.params?.language["id"]);
      setTranslateTitle("Translating Page #" + (i + 1).toString() + "...");
      const response = await axios({
        method: "post",
        url: `${server}/translate`,
        data: form,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const base64Out = response.data["response"];
      bookArray["page" + (i + 1).toString()] = base64Out;
      var copy = [...images];
      copy[i].base64 = base64Out;
      setImages(copy);
    }

    await addData(
      route.params?.title,
      route.params?.description,
      route.params?.language["item"],
      bookArray,
      originalImage
    );

    navigation.navigate("Home");
  };

  return (
    <View>
      {/* Intro Text */}
      <Text style={styles.IntroText}>
        Take pictures of the book that you want to translate using the "Add
        Page" button. {"\n"}
        {"\n"}When you are done, click "Translate" button!
      </Text>

      {/* Pages Preview + Add Page */}
      {cameraPreview ? (
        <Camera
          style={{ height: "65%", margin: 30, borderRadius: 20 }}
          ref={(r) => {
            camera = r;
          }}
        >
          <View
            style={{
              position: "absolute",
              bottom: 0,
              flexDirection: "row",
              flex: 1,
              width: "100%",
              padding: 20,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                alignSelf: "center",
                flex: 1,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={__takePicture}
                style={{
                  width: 70,
                  height: 70,
                  bottom: 0,
                  borderRadius: 50,
                  backgroundColor: "#fff",
                }}
              />
            </View>
          </View>
        </Camera>
      ) : (
        <View style={styles.ContainerView}>
          <Text style={styles.Header}>Pages:</Text>
          <SafeAreaView style={{ height: "70%" }}>
            {images.length === 0 && (
              <Text style={styles.warning}>No pages added.</Text>
            )}
            <ScrollView horizontal showsVerticalScrollIndicator={false}>
              {images.length !== 0 &&
                images.map((element, index) => {
                  return (
                    <ImageBackground
                      key={index}
                      style={styles.Image}
                      imageStyle={{ borderRadius: 20 }}
                      source={{
                        uri: `data:image/jpeg;base64,${element.base64}`,
                      }}
                    >
                      <Text style={styles.PageText}>Page #{index + 1}</Text>
                      <TouchableOpacity
                        style={styles.CloseButton}
                        onPress={() => __deletePicture(index)}
                      >
                        <AntDesign
                          name="closecircleo"
                          size={24}
                          color="white"
                        />
                      </TouchableOpacity>
                    </ImageBackground>
                  );
                })}
            </ScrollView>
          </SafeAreaView>
          <View style={styles.ButtonContainer}>
            <TouchableOpacity style={styles.Button} onPress={__startCamera}>
              <Text style={{ textAlign: "center" }}>Add Page</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={styles.BottomView}>
        <TouchableOpacity
          style={[styles.Button, styles.TranslateButton]}
          onPress={TranslatePages}
        >
          <Text style={{ textAlign: "center" }}>{TranslateTitle}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  IntroText: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    fontSize: 15,
    textAlign: "center",
    fontWeight: "500",
  },
  ContainerView: {
    height: "65%",
    margin: 30,
    backgroundColor: "#dbdbdb",
    borderRadius: 20,
  },
  Header: {
    fontSize: 25,
    color: "black",
    padding: 5,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  ButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    width: "100%",
  },
  Button: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#b5b5b5",
    borderColor: "black",
  },
  TranslateButton: {
    backgroundColor: "#33ccff",
    minWidth: 120,
  },
  warning: {
    marginTop: 10,
    textAlign: "center",
    width: "100%",
  },
  Image: {
    height: 300,
    width: 250,
    marginLeft: 15,
    borderRadius: 15,
  },
  PageText: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: -3, height: 5 },
    textShadowRadius: 3,
  },
  BottomView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  CloseButton: {
    position: "absolute",
    top: 15,
    right: 15,
  },
});

export default LiveTranslation;
