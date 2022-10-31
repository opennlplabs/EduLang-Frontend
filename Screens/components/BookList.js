import { Box, Center } from "native-base";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  ImageBackground,
} from "react-native";

const BookList = ({ navigation, item, NoMessage, isLoading }) => {
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={(e) => {
          navigation.navigate("Book Info", { item: item });
        }}
      >
        <View style={styles.ImageContainer}>
          <ImageBackground source={{ uri: `data:image/jpeg;base64,${item.source}` }} style={styles.image} />
        </View>
        <Text style={{ marginBottom: 5 }}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 100 }}>
        <ActivityIndicator size={"large"} />
      </View>
    )
  }
  else if (item.length == 0) {
    return (
      <Center _text={{ textAlign: 'center', marginX: 7 }} w="100%" h="100px">
        {NoMessage}
      </Center>
      // <View style={{ height: '200px', width: '100%', backgroundColor: "black" }}>
      //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      //     <Text style={styles.text}>{NoMessage}</Text>
      //   </View>
      // </View>
    )
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={item}
          renderItem={renderItem}
          numColumns={2}
        />
      </SafeAreaView>
    );
  }
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
  container: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    paddingLeft: 30,
    paddingRight: 30
  },
  image: {
    //...StyleSheet.absoluteFillObject,
    resizeMode: "contain",
    width: 150,
    height: 170,
    borderRadius: 15,
    overflow: 'hidden',

  },
  ImageContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginBottom: 5
  }
});

export default BookList;