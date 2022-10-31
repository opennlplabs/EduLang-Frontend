import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Image, Dimensions } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
const PDFExample = ({ route }) => {
  const { item } = route.params;
  const [page, setPage] = useState(0);
  const [leftButtonDisabled, setLeftButtonDisabled] = useState(true);
  const [rightButtonDisabled, setRightButtonDisabled] = useState(false);
  const [height, setHeight] = useState(100);
  const lenPages = Object.keys(item.book).length;

  useEffect(() => {
    Image.getSize(
      `data:image/png;base64,${item.book[0]}`,
      (width, height) => {
        const div = height / width;
        const windowWidth = Dimensions.get("window").width;
        setHeight(Math.floor(windowWidth * div));
      }
    );
    setLeftButtonDisabled(true)
    setRightButtonDisabled(false)
    if (lenPages == 1) {
      setLeftButtonDisabled(true);
      setRightButtonDisabled(true);
    }
  }, [Dimensions.get("window")]);

  function changePage(increment) {
    var new_page = 0;
    if (increment && page < lenPages) {
      setPage((page) => page + 1);
      new_page = page + 1;
    } else if (!increment && page > 0) {
      setPage((page) => page - 1);
      new_page = page - 1;
    }
    if (lenPages == 1) {
      setLeftButtonDisabled(true);
      setRightButtonDisabled(true);
    } else if (new_page <= 0) {
      setLeftButtonDisabled(true);
      setRightButtonDisabled(false);
    } else if (new_page >= lenPages - 1) {
      setLeftButtonDisabled(false);
      setRightButtonDisabled(true);
    } else {
      setLeftButtonDisabled(false);
      setRightButtonDisabled(false);
    }
  }

  const images = [
    {
      url: `data:image/jpeg;base64,${item.book[page]}`,
    },
  ];

  return (
    <>
      <View
        style={styles.container}
      >
        <ImageViewer
          style={{
            width: "100%",
            height: height,
            marginBottom: 100,
          }}
          renderIndicator={() => null}
          imageUrls={images}
        />
        {/* <ImageBackground style={{
          width: '100%',
          height: height,
          marginBottom: 80
        }} source={{
          uri: `data:image/jpeg;base64,${item.book["page" + page.toString()]}`,
        }} /> */}
      </View>

      <View style={styles.bar}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            disable={leftButtonDisabled}
            style={styles.Button}
            onPress={() => changePage(false)}
          >
            <AntDesign
              name="arrowleft"
              size={24}
              color={leftButtonDisabled ? "grey" : "black"}
            />
          </TouchableOpacity>
          <Text style={styles.PageNumDisplay}>
            Page {page + 1}/{lenPages}
          </Text>
          <TouchableOpacity
            disabled={rightButtonDisabled}
            style={styles.Button}
            onPress={() => changePage(true)}
          >
            <AntDesign
              name="arrowright"
              size={24}
              color={rightButtonDisabled ? "grey" : "black"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default PDFExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  bar: {
    position: "absolute",
    bottom: 100,
    left: 0,
    width: "100%",
    height: 80,
    backgroundColor: "white",
  },
  Button: {
    padding: 15,
  },
  PageNumDisplay: {
    fontSize: 15,
  },
});
