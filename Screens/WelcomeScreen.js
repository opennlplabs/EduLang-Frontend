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
  Center,
  Heading,
  HStack,
} from "native-base";
import logo from "../assets/images/RealEduLangLogo.png";
import { useTranslation } from "react-i18next";
import { Storage } from "expo-storage";
import { useIsFocused } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useKeyboardShow } from "./hooks/useKeyboardShow";
import CustomButton from "./globals/CustomeButton";
import FormLogin from "./components/WelcomeScreen/FormLogin";
import FormRegister from "./components/WelcomeScreen/FormRegister";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const WelcomeScreenNew = ({ navigation, route }) => {
  const { t } = useTranslation();
  // Decides which form to show
  const [formSelected, setFormSelected] = useState(null);
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
      if (formSelected === "login") formPosition.value = -0.3;
      else formPosition.value = -0.45;
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
      marginBottom: 10,
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

  useEffect(() => {
    const onRenderFunc = async () => {
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
    };
    onRenderFunc();
  }, [isFocused]);

  return (
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
            <CustomButton title="Login" onPress={showFormsLoginHandler} />
          </Animated.View>
          <Animated.View style={[animatedBottonsStyle, styles.buttons]}>
            <CustomButton title="Register" onPress={showFormsRegisterHandler} />
          </Animated.View>

          <Center
            top={HEIGHT * (formSelected === "register" ? 0.29 : 0.37)}
            alignSelf="center"
          >
            <Animated.View style={keyboardAnimatedStyle}>
              <Animated.View style={closeBottonStyle}>
                <CustomButton
                  icon={
                    <MaterialIcons
                      name="close"
                      color="white"
                      style={{ fontSize: 22 }}
                    />
                  }
                  type="icon"
                  onPress={exitHandler}
                />
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
                  {formSelected === "login" && (
                    <FormLogin navigation={navigation} />
                  )}
                  {formSelected === "register" && (
                    <FormRegister navigation={navigation} />
                  )}
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
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  logoText: {
    zIndex: 2,
    fontSize: 40,
  },
 
});

export default WelcomeScreenNew;
