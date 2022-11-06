import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  Pressable,
  NativeBaseProvider,
} from "native-base";
const BookList = ({ navigation, item, NoMessage, isLoading }) => {
  const renderItem = ({ item, index }) => {
    return (
      // <TouchableOpacity
      //   style={styles.item}

      // >
      //   <View style={styles.ImageContainer}>
      //     <ImageBackground
      //       source={{ uri: `data:image/jpeg;base64,${item.source}` }}
      //       style={styles.image}
      //     />
      //   </View>
      //   <Text style={{ marginBottom: 5 }}>{item.title}</Text>
      // </TouchableOpacity>
      <Pressable
        m="8"
        onPress={(e) => {
          navigation.navigate("Book Info", { item: item });
        }}
      >
        {({ isHovered, isFocused, isPressed }) => {
          return (
            <Box
              top="0"
              style={{
                transform: [
                  {
                    scale: isPressed ? 0.9 : 1,
                  },
                ],
              }}
              rounded="md"
              _isPressed={{
                borderColor: "tertiary.700",
                borderWidth: "4",
              }}
              bg="info.300:alpha.50"
              shadow={8}
              w="48"
              h="64"
            >
              <Box
                m="2"
                bg="tertiary.200"
                rounded="md"
                borderWidth="1"
                borderColor="tertiary.500"
                shadow={8}
                flex={1}
              >
                <Center bg="gray.50" flex={2} m="4">
                  <AspectRatio w="90%" h="100%" ratio={6 / 7}>
                    <Image
                      source={{
                        uri: `data:image/jpeg;base64,${item.source}`,
                      }}
                      alt="image"
                    />
                  </AspectRatio>
                </Center>

                <Center
                  bg="info.500"
                  _text={{
                    color: "warmGray.50",
                    fontWeight: "700",
                    fontSize: "xs",
                  }}
                  position="absolute"
                  bottom="40"
                  px="3"
                  py=".5"
                >
                  Cover
                </Center>

                <Stack
                  h="50%"
                  w="100%"
                  borderTopColor="tertiary.500"
                  borderTopWidth="1"
                  pl="2"
                >
                  <Stack space={2}>
                    <Heading py="2" size="sm" color="info.500">
                      {item.title}
                    </Heading>
                  </Stack>
                  <Text color="info.900" fontWeight="400">
                    {item.description}
                  </Text>
                </Stack>
              </Box>
            </Box>
          );
        }}
      </Pressable>
    );
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          height: 100,
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  } else if (item.length == 0) {
    return (
      <Center _text={{ textAlign: "center", marginX: 7 }} w="100%" h="100px">
        {NoMessage}
      </Center>
      // <View style={{ height: '200px', width: '100%', backgroundColor: "black" }}>
      //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      //     <Text style={styles.text}>{NoMessage}</Text>
      //   </View>
      // </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={item}
          renderItem={renderItem}
          // numColumns={2}
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
    textAlign: "center",
    paddingLeft: 30,
    paddingRight: 30,
  },
  image: {
    //...StyleSheet.absoluteFillObject,
    resizeMode: "contain",
    width: 150,
    height: 170,
    borderRadius: 15,
    overflow: "hidden",
  },
  ImageContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginBottom: 5,
  },
});

export default BookList;
