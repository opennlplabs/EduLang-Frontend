import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import PDFReader from "rn-pdf-reader-js";
import { Asset } from 'expo-asset';

const PDFExample = ({route}) => {
  const { item } = route.params;
  return (
    <View style={styles.container}>

      <PDFReader
        source={{
          uri: item.bookPdfUrl // this allows us to pass in the path for the book
        }}
      />
    </View>
  );
}
export default PDFExample

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
