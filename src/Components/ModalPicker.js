import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,,
} from 'react-native';

const OPTIONS = ['arabic', 'spanish', 'telugu', 'tamil'];
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ModalPicker = props => {
  const onPressItem = option => {
    props.changeModalVisibility(false);
    props.setData(option);
  };;


const option = OPTIONS.map((item, index) => {
    return (
      <TouchableOpacity key={index} onPress={() => onPressItem(item)}>
        <Text style={styles.textf}>{item}</Text>
      </TouchableOpacity>
    );
  });;

  return (
    <TouchableOpacity
      onPress={() => props.changeModalVisibility(false)}
      style={styles.container}
    >
      <View style={[styles.modal, {width: WIDTH - 20, height: HEIGHT - 20}]}>
        <ScrollView>{option}</ScrollView>
      </View>
    </TouchableOpacity>
  );;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  optiond: {
    alignItems: 'flex-start',
  },
  textf: {
    margin: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export {ModalPicker}
