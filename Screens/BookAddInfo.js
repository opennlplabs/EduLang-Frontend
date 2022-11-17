import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Switch,
  TextInput,
  StyleSheet,
} from "react-native";
import { Storage } from "expo-storage";
import { useIsFocused } from "@react-navigation/native";
import { LanguageSelector } from "./components/LanguageSelector";
import { Box, Stack } from "native-base";
import Background from "./components/Background";

const BookAddInfo = ({ navigation, route }) => {
  const [title, onChangeTitle] = React.useState("");
  const [description, onChangeDescription] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const [isCustomTranslated, setIsCustomTranslated] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const firstRenderFunc = async () => {
      if (isFocused) {
        const language = JSON.parse(
          await Storage.getItem({ key: "translatedLanguage" })
        );
        setLanguage(language);
      }
    };
    firstRenderFunc();
  }, [isFocused]);

  async function Submit() {
    const titles = JSON.parse(await Storage.getItem({ key: "titles" }));
    if (titles.indexOf(title.replace(/\s+/g, "_")) >= 0) {
      alert("Duplicate Title! Choose a different title.");
    } else {
      navigation.navigate({
        name: route.params?.navigateTo,
        params: {
          language: language,
          title: title.replace(/\s+/g, "_"),
          description: description,
          customTranslated: isCustomTranslated,
        },
      });
    }
  }

  return (
    <Box bg="tertiary.100" flex={1}>
      <Background />
      <Text style={[styles.question, styles.margin]}>
        What is the Title of the book?
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeTitle}
        value={title}
      />
      <Text style={[styles.question]}>
        What is the Description of the book?
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeDescription}
        value={description}
      />
      {language !== "" && (
        <>
          <Text style={[styles.question]}>
            What is the language of the book?
          </Text>
          <LanguageSelector
            placeholder="Select the language that your book is in"
            onValueChange={setLanguage}
            defaultValue={language}
          />
        </>
      )}
      {route.params.navigateTo !== "Add PDF" && (
        <>
          <Text style={styles.question}>
            Do you want to translated manually?
          </Text>
          <View style={styles.SwitchContainer}>
            <Switch
              style={styles.Switch}
              value={isCustomTranslated}
              onValueChange={() => setIsCustomTranslated((value) => !value)}
            />
          </View>
        </>
      )}
      <View style={{ flex: 1, alignItems: "center" }}>
        <TouchableOpacity style={styles.Button} onPress={Submit}>
          <Text style={{ textAlign: "center" }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </Box>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  margin: {
    marginTop: 140,
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
    width: 100,
    height: 40,
    marginTop: 20,
  },
  SwitchContainer: {
    marginTop: 30,
    marginBottom: 20,
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BookAddInfo;
