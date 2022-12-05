import React from "react";
import {
  View,
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Icon,
  Pressable,
  NativeBaseProvider,
} from "native-base";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import CustomButton from "../../globals/CustomeButton";

const renderItem = ({ item, index, navigation }) => {
  return (
    <View m={3} h="200" w="160" shadow={8}>
      <Pressable
        onPress={(e) => {
          navigation.navigate("Book Info", { item: item });
        }}
      >
        <Box
          bg="gray.50"
          h="160"
          borderRadius={15}
          overflow="hidden"
          justifyContent={"center"}
        >
          <AspectRatio w="90%" h="70%">
            <Image
              source={{
                uri: `data:image/jpeg;base64,${item?.source}`,
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Text style={{ marginTop: 15, textAlign: "center" }}>
          {item?.title?.replaceAll("_", " ")}
        </Text>
      </Pressable>
    </View>
  );
};

const BookRow = (props) => {
  const { noMessage, data, type, noBooksLabel, onAddPress } = props;
  return (
    <View>
      <Center>
        <Heading color="info.500">{type}</Heading>
      </Center>
      {data.length === 0 && (
        <Center my="1/6" py="5" bg="info.100" rounded="3xl" mx="10">
          <Heading color="muted.400">{noMessage}</Heading>

          <Pressable onPress={onAddPress}>
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
                  bg="tertiary.400:alpha.8"
                  shadow={8}
                >
                  <Icon
                    as={<MaterialIcons name="add" />}
                    size={5}
                    m="2"
                    color="tertiary.600"
                    alignSelf="center"
                  />
                </Box>
              );
            }}
          </Pressable>
        </Center>
      )}
      <FlatList
        horizontal
        style={{ marginTop: 5 }}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
};

export default BookRow;
