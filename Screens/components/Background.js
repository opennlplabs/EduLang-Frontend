import { StatusBar, Image, Dimensions } from "react-native";
import React from "react";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const Background = () => {
  return (
    <Image
      resizeMode="cover"
      style={{ height: HEIGHT * 0.18, width: WIDTH, position: "absolute" }}
      source={require("../../assets/wave1.png")}
    />
  );
};
export default Background;
