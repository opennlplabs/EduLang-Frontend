import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
} from "react-native";
import { server } from "./LiveTranslation";
import axios from "axios";
import { addBookLocally } from "./StorageUtils/BookStorage";

export default function CustomTranslation({ navigation, route }) {
  var images = route.params?.images;
  var originalImage = images[0];
  var title = route.params?.title;
  var description = route.params?.description;
  var language = route.params?.language;

  const [boxes, setBoxes] = useState([]);
  const [finish, setFinish] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const [responses, setResponses] = useState([]);
  const [index, setIndex] = useState(0);
  const [TranslateTitle, setTranslateTitle] = useState("");

  // After the translations of all the pages are done, then change the image with the translated text and add to book
  async function processInformation() {
    setTranslateTitle("Processing Information...");
    const form = new FormData();
    console.log("testing...");
    console.log(images[index].length);
    form.append("languageId", JSON.stringify(route.params?.language));
    form.append("base64Image", images[index]);
    form.append("boxes", JSON.stringify(boxes));
    form.append("index", JSON.stringify(index));
    form.append("responses", JSON.stringify(responses));
    const resp = await axios({
      method: "post",
      url: `${server}/ChangeImage`,
      data: form,
      headers: { "content-type": "multipart/form-data" },
    });
    console.log("reviewved response data");
    var copy = [...newImages];
    copy[index] = resp.data["response"];
    setNewImages(copy);

    setResponses([]);
    if (index + 1 === images.length) {
      setTranslateTitle("Adding Book to Library...");

      await addBookLocally(title, description, language, copy, originalImage);

      navigation.navigate("Home Screen");
    } else {
      setFinish(false);
      setIndex((index) => index + 1);
    }
  }

  function setResp(t, e) {
    var copy = [...responses];
    copy[e] = t;
    setResponses(copy);
  }

  useEffect(() => {
    const firstRenderFunc = async () => {
      // The finish variable tracks if the new image has bounding boxes for manual translation input.
      if (!finish) {
        // Start Translating first image
        const base64Image = images[index];
        const form = new FormData();

        var copy = [...newImages];
        copy.push(base64Image);
        setNewImages(copy);

        form.append("base64Image", base64Image);
        setTranslateTitle(
          "Getting information for Page #" + (index + 1).toString() + "..."
        );
        const response = await axios({
          method: "post",
          url: `${server}/getBoundingBoxImage`,
          data: form,
          headers: { "content-type": "multipart/form-data" },
        });
        copy[copy.length - 1] = response.data["response"];
        setNewImages(copy);

        const box = JSON.parse(response.data["box"]);
        if (box.length == 0) {
          setFinish(false);
          setIndex((index) => index + 1);
        } else {
          setBoxes(box);
          setTranslateTitle("Enter Information");
          setResponses(Array(box.length).fill(""));
          setFinish(true);
        }
      }
    };
    firstRenderFunc();
  }, [index]);

  return (
    <ScrollView>
      <Text style={styles.Title}>Page #{index + 1}</Text>
      <Text style={styles.Description}>
        {images.length - (index + 1)} page(s) left to translate
      </Text>

      <View style={{ flex: 1, alignItems: "center" }}>
        <ImageBackground
          style={styles.Image}
          imageStyle={{ borderRadius: 30 }}
          source={{ uri: `data:image/jpeg;base64,${newImages[index]}` }}
        />
      </View>

      {responses.map((e, i) => {
        return (
          <View key={i}>
            <Text style={styles.question}>
              Enter your translation for Box #{(i + 1).toString()}:
            </Text>
            <TextInput
              multiline
              numberOfLines={4}
              style={styles.input}
              onChangeText={(t) => setResp(t, i)}
              value={e}
            />
          </View>
        );
      })}

      <View style={{ flex: 1, alignItems: "center" }}>
        <TouchableOpacity style={styles.Button} onPress={processInformation}>
          <Text style={styles.ButtonText}>{TranslateTitle}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 400, width: "100%" }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Title: {
    width: "100%",
    fontSize: 25,
    textAlign: "center",
    marginTop: 25,
  },
  Description: {
    width: "100%",
    fontSize: 15,
    textAlign: "center",
    marginTop: 5,
  },
  input: {
    margin: 12,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "grey",
    padding: 10,
  },
  question: {
    marginLeft: 10,
    fontSize: 18,
    width: "100%",
    textAlign: "center",
  },
  Button: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#dbdbdb",
    borderColor: "black",
  },
  Image: {
    marginTop: 30,
    marginBottom: 30,
    height: 500,
    width: 350,
    borderRadius: 25,
  },
  ButtonText: {
    fontSize: 15,
    textAlign: "center",
    color: "black",
  },
});
