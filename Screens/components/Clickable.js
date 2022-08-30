import react from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Clickable = (props) => {
  const { text, onPress, textStyle, containerStyle, isParent = false } = props;
  if (isParent) {
    return (
      <TouchableOpacity style={[containerStyle]} onPress={onPress}>
        {props.children}
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, containerStyle]}
      onPress={onPress}
    >
      <Text style={[styles.textStyle, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 4,
    padding: 10,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#93CB54",
    // marginHorizontal: 20,
  },
  textStyle: {
    fontSize: 20,
    color: "white",
    //textTransform: "uppercase",
  },
});

export default Clickable;
