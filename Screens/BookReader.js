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
import { Center } from "native-base";
const PDFExample = ({ route }) => {
  const { item } = route.params;
  const [page, setPage] = useState(0);
  const [leftButtonDisabled, setLeftButtonDisabled] = useState(true);
  const [rightButtonDisabled, setRightButtonDisabled] = useState(false);
  const [height, setHeight] = useState(100);
  const lenPages = Object.keys(item.book).length;

  // find screen orientation
  const [orientation, setOrientation] = useState('PORTRAIT');

  const determineAndSetOrientation = () => {
    let width = Dimensions.get('window').width;
    let height = Dimensions.get('window').height;

    if (width < height) {
      setOrientation('PORTRAIT');
    } else {
      setOrientation('LANDSCAPE');
    }
  }

  useEffect(() => {
    determineAndSetOrientation();
    Dimensions.addEventListener('change', determineAndSetOrientation);
  }, []);



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

  if (orientation == "PORTRAIT") {

    return (
      <>
        <View
          style={styles.container}
        >
          <ImageViewer
            style={{
              width: "100%",
              height: height,
            }}
            renderIndicator={() => null}
            imageUrls={images}
            backgroundColor="#FFFFFF"
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
  } else {
    return (
      <Center>
        <View style={{
          width: "90%",
          height: "100%",
          alignItems: "center",
          paddingBottom: 10
        }}>
          <View
            style={styles.horizontalContainer}
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
            <ImageViewer
              style={{
                width: "100%",
                height: "100%",
              }}
              renderIndicator={() => null}
              imageUrls={images}
              backgroundColor="#FFFFFF"
            />
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
          <Text style={styles.PageNumDisplay}>
            Page {page + 1}/{lenPages}
          </Text>
        </View>
      </Center>
    );
  }
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
    bottom: 0,
    left: 0,
    width: "100%",
    height: 100,
    backgroundColor: "white",
  },
  Button: {
    padding: 15,
  },
  PageNumDisplay: {
    fontSize: 15,
  },
  horizontalContainer: {
    width: "100%",
    height: "100%",
    paddingBottom: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  }
});
