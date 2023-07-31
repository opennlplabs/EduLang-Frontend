import React from "react";
import {
  Icon,
  Input,
  Pressable,
  Stack,
  FormControl,
  Select,
} from "native-base";
import { createUser, setUserInfo } from "./StorageUtils/UserStorage";
import { MaterialIcons } from "@expo/vector-icons";

export default function FormRegister({ navigation }) {
  const [show, setShow] = React.useState(false);
  const [grade, setGrade] = React.useState(-1);
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [translatedLanguage, setTranslatedLanguage] = React.useState("");
  const [originalLanguage, setOriginalLanguage] = React.useState("");

  async function registerUser() {
    setErrorMsg("");
    // notify user that message
    if (username === "") {
      setErrorMsg("Please enter a username!");
      return;
    }
    if (email === "") {
      setErrorMsg("Please enter a email!");
      return;
    }
    if (grade === -1) {
      setErrorMsg("Please select a grade!");
      return;
    }
    if (originalLanguage === "") {
      setErrorMsg("Please select an original language!");
      return;
    }
    if (translatedLanguage === "") {
      setErrorMsg("Please select a translated language!");
      return;
    }
    if (translatedLanguage === originalLanguage) {
      setErrorMsg(
        "Your translated language cannot be equal to your original language!"
      );
      return;
    }
    if (password === "") {
      setErrorMsg("Please enter a password!");
      return;
    }

    await createUser(email, password)
      .catch((err) => {
        switch (err) {
          case "auth/email-already-in-use":
            setErrorMsg(`Email address already in use.`);
            break;
          case "auth/invalid-email":
            setErrorMsg(`Email address is invalid.`);
            break;
          case "auth/weak-password":
            setErrorMsg("Password is not strong enough.");
            break;
          default:
            setErrorMsg("Unknown error with error code " + code);
            break;
        }
      })
      .then(async () => {
        await setUserInfo(
          originalLanguage,
          translatedLanguage,
          grade,
          username
        );
        navigation.navigate("Tabs");
      });
  }

  return (
    <Stack w="100%" alignItems="center">
      <Stack>
        <FormControl isInvalid isRequired>
          <Stack space={2.5} w="100%">
            <Input
              w={{
                base: "75%",
                md: "25%",
              }}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="person" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              placeholder="Username"
              onChangeText={setUsername}
            />
            <Input
              w={{
                base: "75%",
                md: "25%",
              }}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="person" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              placeholder="Email"
              onChangeText={setEmail}
            />
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
            >
              <Select.Item label="Grade 1" value={1} />
              <Select.Item label="Grade 2" value={2} />
              <Select.Item label="Grade 3" value={3} />
              <Select.Item label="Grade 4" value={4} />
              <Select.Item label="Grade 5" value={5} />
            </Select>
            <LanguageSelector
              placeholder="Original Language"
              onValueChange={setOriginalLanguage}
            />
            <LanguageSelector
              placeholder="Translated Language"
              onValueChange={setTranslatedLanguage}
            />

            <Input
              w={{
                base: "75%",
                md: "25%",
              }}
              type={show ? "text" : "password"}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
              placeholder="Password"
              onChangeText={setPassword}
            />
            <FormControl.ErrorMessage
              w="75%"
              display={errorMsg === "" ? "none" : undefined}
            >
              {errorMsg}
            </FormControl.ErrorMessage>
            <CustomButton title="Register" onPress={registerUser} />
          </Stack>
        </FormControl>
      </Stack>
    </Stack>
  );
}
