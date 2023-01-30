import React, {useState} from 'react';
import {
  View,
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
} from 'react-native';
import * as firebase from 'firebase';
import CustomButton from '../globals/CustomeButton';
import {Center, VStack} from 'native-base';

const FeedbackModal = ({visible, hideModal}) => {
  const [feedbackText, setfeedbackText] = useState('');

  const SubmitFeedback = () => {
    if (feedbackText == '') {
      alert('Please enter feedback');
    } else {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          firebase
            .firestore()
            .collection('feedbacks')
            .add({
              userEmail: user.email,
              feedback: feedbackText,
              timeStampp: Date.now(),
            })
            .then(() => {
              alert('feedback sent');
              hideModal();
            })
            .catch(err => {
              alert(err);
            });
        }
      });
    }
  };

  return (
    <Modal transparent onRequestClose={hideModal} visible={visible}>
      <Center mt="3/6">
        <View style={styles.modalView}>
          <Text style={{alignSelf: 'center', margin: 10}}>
            Submit your feedback for our app!
          </Text>
          <TextInput
            onChangeText={setfeedbackText}
            style={styles.textinput}
            textAlignVertical="top"
            multiline
            placeholder="Enter here"
          />

          <VStack space={3}>
            <CustomButton title="Cancel" onPress={hideModal} />
            <CustomButton title="Submit" onPress={SubmitFeedback} />
          </VStack>
        </View>
      </Center>
    </Modal>
  );
};
export default FeedbackModal;

const styles = StyleSheet.create({
  modalView: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 7,
  },
  textinput: {
    margin: 10,

    padding: 10,
    width: '90%',
    height: 100,
    backgroundColor: '#eee',
  },
  buttonStyle: {
    borderRadius: 4,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6aa598',
    // marginHorizontal: 20,
  },
});
