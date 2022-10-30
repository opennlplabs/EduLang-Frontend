import { MaterialIcons, Ionicons } from "@expo/vector-icons";
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
  Button,
  Flex,
  Spacer
} from "native-base";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Alert } from "react-native";
import Clickable from "./components/Clickable";
import { useTranslation } from "react-i18next";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import { deleteAccount, getUserInfoFirebase, logoutUser, logoutUserFirebase, setUserInfo } from "./StorageUtils/UserStorage";
import { clearAllStorageData } from "./StorageUtils/BookStorage";
import { LanguageSelector } from "./components/LanguageSelector";

const Settings = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [gradeLevel, setGradeLevel] = useState(0);
  const [nativelanguage, setnativeLanguage] = useState({});
  const [translatedlanguage, setTranslatedLanguage] = useState({});
  const [isLoading, setIsLoading] = useState(true)
  const isFocused = useIsFocused()

  useEffect(async () => {
    if (isFocused === true) {
      const [grade, nativeLanguage, translatedLanguageConfig, username, isAdmin] = await getUserInfoFirebase()
      setGradeLevel(grade)
      setnativeLanguage(nativeLanguage)
      setTranslatedLanguage(translatedLanguageConfig)
      setIsLoading(false)
    }
  }, [isFocused]);

  const SaveInfo = async () => {
    if (translatedlanguage == nativelanguage) {
      alert("The translated language and the native language cannot be the same!")
    }
    else {
      await setUserInfo(
        nativelanguage,
        translatedlanguage,
        gradeLevel,
        undefined
      )

      navigation.replace("Splash")
    }
  };

  const deleteUser = async () => {
    Alert.alert("Confirm on deleting on your account?", "Would you like to delete your account? All storage data (books you have created, favorites, downloaded books, etc.) will be lost forever!", [
      {
        text: "Confirm", onPress: async () => {
          await clearAllStorageData()
          await deleteAccount()
          navigation.replace("Welcome Screen")
        }
      },
      { text: "Cancel", style: 'cancel' }
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <FormControl>
        <Stack space={2.5} w="100%">
          <FormControl.Label>Select your new grade level:</FormControl.Label>
          {!isLoading &&
            <>
              <Select
                w={{
                  base: "100%",
                }}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="person" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                }
                placeholder="Grade"
                onValueChange={(value) => setGrade(value)}
                defaultValue={gradeLevel}
              >
                <Select.Item label="Grade 1" value={1} />
                <Select.Item label="Grade 2" value={2} />
                <Select.Item label="Grade 3" value={3} />
                <Select.Item label="Grade 4" value={4} />
                <Select.Item label="Grade 5" value={5} />
              </Select>
              <FormControl.Label>Select your native language:</FormControl.Label>
              <LanguageSelector placeholder="Original Language" onValueChange={setnativeLanguage} defaultValue={nativelanguage} />
              <FormControl.Label>Select your translated language:</FormControl.Label>
              <LanguageSelector placeholder="Translated Language" onValueChange={setTranslatedLanguage} defaultValue={translatedlanguage} />
            </>
          }
        </Stack>
      </FormControl>

      <Flex marginTop={4} direction="row" justify="center">
        <Button w="1/4" onPress={SaveInfo}>{t("general.save")}</Button>
        <Spacer />
        <Button w="1/4" onPress={() => { logoutUserFirebase().then(() => { navigation.replace("Welcome Screen"); }) }}>Logout</Button>
        <Spacer />
        <Button w="1/3" onPress={deleteUser}>Delete User</Button>
      </Flex>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  loginButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  paddingBottomText: {
    marginTop: 20,
    fontSize: 15,
  },
});

export default Settings;
