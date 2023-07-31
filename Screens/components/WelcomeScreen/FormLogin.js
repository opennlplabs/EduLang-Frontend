import React from "react";
import {
  Icon,
  Input,
  Pressable,
  Stack,
  FormControl,
} from "native-base";
import i18n from "../locale";
import {
  loginEmailPassword,
} from "./StorageUtils/UserStorage";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import CustomButton from "./globals/CustomeButton";

export default function FormLogin ({ navigation }) {
  const [show, setShow] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [emailErrorMsg, setEmailErrorMsg] = React.useState("");
  const [isInvalid, setIsInvalid] = React.useState(false);

  function loginUser() {
    if (email === "") {
      setIsInvalid(true);
      setEmailErrorMsg("Enter your email address");
      setPasswordErrorMsg("");
      return;
    }
    if (password === "") {
      setIsInvalid(true);
      setEmailErrorMsg("");
      setPasswordErrorMsg("Enter your password");
      return;
    }

    loginEmailPassword(email, password)
      .then(() => {
        setIsInvalid(false);
        i18n.changeLanguage("en");
        navigation.replace("Tabs");
      })
      .catch((error) => {
        // if we can't login, then notify the user the problem
        setIsInvalid(true);
        switch (error) {
          case "auth/wrong-password":
            setPasswordErrorMsg("Incorrect password");
            setEmailErrorMsg("");
            break;
          case "auth/invalid-email":
            setPasswordErrorMsg("");
            setEmailErrorMsg("Invalid Email");
            break;
          case "auth/user-not-found":
            setEmailErrorMsg("User not found.");
            setPasswordErrorMsg("");
            break;
          default:
            setEmailErrorMsg("");
            setPasswordErrorMsg("Error Message: " + error);
            break;
        }
      });
  }

  return (
    <Stack space={4} w="100%" alignItems="center">
      <Stack>
        <FormControl isInvalid={isInvalid} isRequired>
          <FormControl.Label>Email</FormControl.Label>
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
            onChangeText={(text) => setEmail(text)}
          />
          <FormControl.ErrorMessage
            display={emailErrorMsg === "" ? "none" : undefined}
            leftIcon={<Ionicons name="alert-circle-outline" />}
          >
            {emailErrorMsg}
          </FormControl.ErrorMessage>
          <FormControl.Label>Password</FormControl.Label>
          <Input
            w={{
              base: "75%",
              md: "25%",
            }}
            onChangeText={(text) => setPassword(text)}
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
          />
          <FormControl.ErrorMessage
            display={passwordErrorMsg === "" ? "none" : undefined}
            leftIcon={<Ionicons name="alert-circle-outline" />}
          >
            {passwordErrorMsg}
          </FormControl.ErrorMessage>
        </FormControl>
        <CustomButton
          style={{ marginTop: 20 }}
          title="Login"
          onPress={loginUser}
        />
      </Stack>
    </Stack>
  );
};