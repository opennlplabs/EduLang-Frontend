import React from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";

const BookList = ({ navigation, item }) => {
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={(e) => {
          navigation.navigate("Book Info", { item: item });
        }}
      >
        <Image source={{ uri: item.source }} style={styles.image} />
        <Text>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return <FlatList data={item} renderItem={renderItem} horizontal />;
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 10,
    marginVertical: 5,
    flex: 1,
    //backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    //...StyleSheet.absoluteFillObject,
    resizeMode: "contain",
    width: 180,
    height: 170,
  },
});

export default BookList;
