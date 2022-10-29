import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Keyboard,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import {
  Box,
  Alert,
  Center,
  Heading,
  HStack,
  Icon,
  Input,
  Pressable,
  Stack,
  Text,
  VStack,
} from "native-base";
import logo from "../assets/images/RealEduLangLogo.png";
import { COLORS } from "../constants/theme";
import i18n from "../locale";
import Clickable from "./components/Clickable";
import { useTranslation } from "react-i18next";
import { loginEmailPassword } from "./StorageUtils/UserStorage";
import { Storage } from "expo-storage";
import { useIsFocused } from "@react-navigation/native";
import Svg, { Ellipse, ClipPath } from "react-native-svg";
import { MaterialIcons } from "@expo/vector-icons";
import { useKeyboardShow } from "./hooks/useKeyboardShow";

const FormLogin = () => {
  const [show, setShow] = React.useState(false);
  return (
    <Stack space={4} w="100%" alignItems="center">
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
        placeholder="Name"
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
                <MaterialIcons name={show ? "visibility" : "visibility-off"} />
              }
              size={5}
              mr="2"
              color="muted.400"
            />
          </Pressable>
        }
        placeholder="Password"
      />
      <CustomButtons title="Login" />
    </Stack>
  );
};
const FormRegister = () => {
  const [show, setShow] = React.useState(false);
  return (
    <Stack space={4} w="100%" alignItems="center">
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
        placeholder="Name"
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
        placeholder="Username"
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
        placeholder="Grade"
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
                <MaterialIcons name={show ? "visibility" : "visibility-off"} />
              }
              size={5}
              mr="2"
              color="muted.400"
            />
          </Pressable>
        }
        placeholder="Password"
      />
      <CustomButtons title="Register" />
    </Stack>
  );
};

const CustomButtons = ({ title, onPress, type = "button" }) => {
  return (
    <Pressable onPress={onPress}>
      {({ isHovered, isFocused, isPressed }) => {
        return (
          <Box
            style={{
              transform: [
                {
                  scale: isPressed ? 0.9 : 1,
                },
              ],
            }}
            rounded="full"
            px={type === "button" ? "20" : "0"}
            bg="tertiary.400:alpha.8"
            py="2"
            shadow={8}
            alignSelf="center"
          >
            <Box
              w={type === "button" ? "24" : "10"}
              alignItems="center"
              justifyContent="center"
              shadow={8}
            >
              <Text color="white">{title}</Text>
            </Box>
          </Box>
        );
      }}
    </Pressable>
  );
};
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const WelcomeScreenNew = ({ navigation }) => {
  const { t } = useTranslation();
  // Decides which form to show
  const [formSelected, setFormSelected] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const isFocused = useIsFocused();
  // Allows animation
  const imagePosition = useSharedValue(1);
  const formPosition = useSharedValue(1);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0.01, 1],
      [-HEIGHT / 1.5, 0]
    );
    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });
  // helps detect if keyboard is display
  const isKeyboardVisible = useKeyboardShow();
  useEffect(() => {
    if (isKeyboardVisible) {
      formPosition.value = 0.01;
    } else {
      formPosition.value = 1;
    }
  }, [isKeyboardVisible]);

  // helps move everything up when keyboard is display
  const keyboardAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      formPosition.value,
      [0, 1],
      [-HEIGHT / 4, 0]
    );
    return {
      transform: [{ translateY: withTiming(interpolation, { duration: 400 }) }],
    };
  });
  // toggles Animatin
  const animatedBottonsStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [255, 0]);
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });
  const closeBottonStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
      transform: [
        { rotate: withTiming(interpolation + "deg", { duration: 1000 }) },
      ],
    };
  });
  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, { duration: 800 }))
          : withTiming(0, { duration: 300 }),
    };
  });
  const showFormsLoginHandler = () => {
    setFormSelected("login");
    imagePosition.value = 0;
  };
  const showFormsRegisterHandler = () => {
    setFormSelected("register");
    imagePosition.value = 0;
  };
  const exitHandler = () => {
    imagePosition.value = 1;
    setFormSelected(null);
  };

  useEffect(async () => {
    // Set local variables
    await Storage.setItem({
      key: "data",
      value: "[]",
    });
    await Storage.setItem({
      key: "titles",
      value: "[]",
    });
    await Storage.setItem({
      key: "favBooks",
      value: "[]",
    });
    await Storage.setItem({
      key: "completedBooks",
      value: "[]",
    });
  }, [isFocused]);

  const handleSignUp = () => {
    navigation.navigate("Registration Page", { email, password });
  };

  const handleLogin = () => {
    loginEmailPassword(email, password)
      .then(() => {
        i18n.changeLanguage("en");
        navigation.replace("Home");
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    //   <ImageBackground style={styles.backgroundContainer}>
    //     <View>
    //       <Image
    //         resizeMode="cover"
    //         style={{ height: 150, width: 400 }}
    //         source={require("../assets/wave1.png")}
    //       />
    //     </View>

    //     <View style={styles.subHeader}>
    //       <View style={{ paddingHorizontal: 15, width: "50%" }}>
    //         <Text style={[styles.logoText, { color: "#93CB54" }]}>
    //           Edu<Text style={{ color: "#4CA4D3" }}>Lang</Text>
    //         </Text>
    //         <Text style={styles.bodyText}>{t("general.appSubstring")}</Text>
    //       </View>
    //       <View>
    //         <Image source={logo} style={styles.logo} />
    //       </View>
    //     </View>

    //     <View style={styles.userInteractionContainer}>
    //       <TextInput
    //         style={styles.input}
    //         placeholder={t("general.email")}
    //         placeholderTextColor={COLORS.white_70}
    //         underlineColorAndroid="transparent"
    //         value={email}
    //         onChangeText={(text) => {
    //           setErrorMessage("");
    //           setEmail(text);
    //         }}
    //       />

    //       <TextInput
    //         style={[styles.input, { marginTop: 20 }]}
    //         placeholder={t("general.password")}
    //         value={password}
    //         onChangeText={(text) => {
    //           setErrorMessage("");
    //           setPassword(text);
    //         }}
    //         secureTextEntry={true}
    //         placeholderTextColor={"rgba(255,255,255,0.7)"}
    //         underlineColorAndroid="transparent"
    //       />

    //       <Clickable
    //         text={t("general.login")}
    //         containerStyle={{ marginTop: 20 }}
    //         textStyle={{ color: "black", fontSize: 15 }}
    //         onPress={handleLogin}
    //       />
    //       <TouchableOpacity style={[styles.buttonStyle]} onPress={handleSignUp}>
    //         <Text style={{ fontSize: 15 }}>Sign Up</Text>
    //       </TouchableOpacity>

    //       <Text>{errorMessage}</Text>
    //     </View>
    //   </ImageBackground>
    // </SafeAreaView>

    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
            <Box>
              <Image
                resizeMode="cover"
                style={{ height: HEIGHT * 0.2, width: WIDTH }}
                source={require("../assets/wave1.png")}
              />
              <Center>
                <HStack>
                  <Heading size="xl" color="#93CB54">
                    Edu
                  </Heading>
                  <Heading size="xl" color="#4CA4D3">
                    Lang
                  </Heading>
                </HStack>

                <Image source={logo} style={styles.logo} />
                <Heading size="sm" color="#4CA4D3">
                  {t("general.appSubstring")}
                </Heading>
              </Center>
            </Box>
          </Animated.View>

          <Animated.View style={[animatedBottonsStyle, styles.buttons]}>
            <CustomButtons title="Login" onPress={showFormsLoginHandler} />
          </Animated.View>
          <Animated.View style={[animatedBottonsStyle, styles.buttons]}>
            <CustomButtons
              title="Register"
              onPress={showFormsRegisterHandler}
            />
          </Animated.View>

          <Center top={HEIGHT * 0.37} alignSelf="center">
            <Animated.View style={keyboardAnimatedStyle}>
              <Animated.View style={closeBottonStyle}>
                <CustomButtons title="X" type="icon" onPress={exitHandler} />
              </Animated.View>
              <Animated.View style={formAnimatedStyle}>
                <Box
                  zIndex={-1}
                  width={WIDTH}
                  height={HEIGHT}
                  borderTopRadius="100"
                  bg="gray.100"
                  pt="1/6"
                >
                  {formSelected === "login" && <FormLogin />}
                  {formSelected === "register" && <FormRegister />}
                </Box>
              </Animated.View>
            </Animated.View>
          </Center>
        </>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#d1fae5",
  },
  keyboardContainer: {
    zIndex: -1,
  },

  buttons: {
    zIndex: 2,
    alignSelf: "center",
    top: HEIGHT * 0.75,
    paddingTop: 20,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  // backgroundContainer: {
  //   flex: 1,
  //   width: null,
  //   height: null,
  //   alignItems: "center",
  //   //justifyContent: 'center',
  // },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  logoText: {
    // color: COLORS.darkCoral,
    zIndex: 2,
    fontSize: 40,
    // paddingVertical: 5,
    // fontWeight: "500",
    // fontFamily: "Inter-V",
  },
  // bodyText: {
  //   fontSize: 18,
  //   width: 230,
  //   color: "black", //change to lighter coral later
  // },
  // input: {
  //   backgroundColor: "#808080",
  //   height: 35,
  //   padding: 8,
  //   borderRadius: 4,
  //   //color: COLORS.darkCoral,
  // },
  // userInteractionContainer: {
  //   marginTop: 50,
  //   paddingHorizontal: 20,
  //   flex: 1,
  //   // width: WIDTH,
  // },
  // subHeader: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   width: "100%",
  //   justifyContent: "space-around",
  // },
  // buttonStyle: {
  //   borderRadius: 4,
  //   padding: 10,
  //   margin: 10,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   backgroundColor: "#a9d576",
  //   // marginHorizontal: 20,
  // },
});

export default WelcomeScreenNew;
