import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, StyleSheet, Modal} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {useTranslation} from 'react-i18next';
import {useIsFocused} from '@react-navigation/native';
// import {
//   addToFav,
//   getFavBooks,
//   removeFromFav,
//   addBookLocally,
//   removeFromCompleted,
//   uploadBook,
//   removeFromData,
//   acceptBook,
//   getBookPages,
//   getLocalStorageBook,
//   delay,
// } from './StorageUtils/BookStorage';
import CustomButton from '../../../Components/CustomeButton';
import {Box, VStack, Text} from 'native-base';
import * as NativeBase from 'native-base';

const BookInfo = ({navigation, route}) => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisable] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const {item} = route.params;
  const isAdmin = Object.keys(item).includes('isAdmin');
  const [modalTitle, setModalTitle] = useState('');
  const isFocused = useIsFocused();

  // // Get favorite list
  // useEffect(() => {
  //   const firstRenderFunc = async () => {
  //     if (isFocused) {
  //       const favList = await getFavBooks((full_data = false));
  //       if (favList.some(book => book === item.title)) {
  //         setIsFav(true);
  //       }
  //     }
  //   };
  //   firstRenderFunc();
  // }, [isFocused]);

  // const uploadBookMod = async () => {
  //   setModalVisable(true);
  //   setModalTitle('Uploading to Books Review...');

  //   await uploadBook(item);

  //   setModalVisable(false);
  //   navigation.navigate({
  //     name: 'Home Screen',
  //   });
  // };

  // When admin decides to accept the book
  const addToBooks = async () => {
    if (item.book == undefined || item.book.length === 0) {
      alert('You must read the book first before you submit!');
    } else {
      setModalTitle('Accepting Book...');
      setModalVisable(true);

      await acceptBook(item);

      setModalVisable(false);

      navigation.navigate({
        name: 'Home Screen',
      });
    }
  };

  const deleteBook = async item => {
    await removeFromFav(item);
    await removeFromCompleted(item);
    await removeFromData(item);

    navigation.navigate('Home Screen');
  };

  const downloadBook = async item => {
    // First check if exist in library in the first place
    var [bookData, titlesLang] = await getLocalStorageBook();
    console.log(bookData.length, titlesLang.length);
    if (titlesLang.includes(item.title)) {
      alert('You have already downloaded this book!');
      return;
    }

    setModalVisable(true);
    setModalTitle('Downloading Book...');

    // first check if we have any pages
    if (item.book == undefined || item.book.length === 0) {
      var isAdminBook = false;
      if (item.isAdmin === true) {
        isAdminBook = true;
      }
      const pages = await getBookPages(item.id, item.lenPages, isAdminBook);
      item.book = pages;
    }

    await addBookLocally(
      item.title,
      item.description,
      item.language,
      item.book,
      item.source,
      true
    );

    bookData, (titlesData = await getLocalStorageBook());

    await delay(1000); // we need this delay for expo storage to set everything right
    setModalVisable(false);
    navigation.navigate('Home Screen');
  };

  const startReading = async item => {
    // first check if we have any pages
    if (item.book == undefined || item.book.length === 0) {
      setModalVisable(true);
      setModalTitle('Getting Pages...');
      var isAdminBook = false;
      if (item.isAdmin === true) {
        isAdminBook = true;
      }
      const pages = await getBookPages(item.id, item.lenPages, isAdminBook);
      item.book = pages;
      setModalVisable(false);
    }
    navigation.navigate('Book Reader', {item: item});
  };

  // We want to display certain things (favorite symbol, check mark, etc.) and not other based on a number of factors.
  function ConditionalRender(props) {
    if (isAdmin) {
      // just return the check
      return (
        <TouchableOpacity>
          <AntDesign name="check" size={24} onPress={addToBooks} />
        </TouchableOpacity>
      );
    } else {
      // regular user; book from the library or the home page
      return (
        <>
          {isFav &&
            item.isAtHome && ( // Display Favorite icon
              <TouchableOpacity
                onPress={async () => setIsFav(await removeFromFav(item))}
              >
                <AntDesign name="heart" size={24} color="red" />
              </TouchableOpacity>
            )}
          {!isFav && item.isAtHome && (
            <TouchableOpacity
              onPress={async () => setIsFav(await addToFav(item))}
            >
              <AntDesign name="hearto" size={24} color="black" />
            </TouchableOpacity>
          )}

          {/* Display upload button only if it is not in library */}
          {!item.isFromLibrary && (
            <TouchableOpacity onPress={() => uploadBookMod()}>
              <AntDesign
                style={{marginLeft: 10}}
                name="clouduploado"
                size={28}
                color="black"
              />
            </TouchableOpacity>
          )}

          {/* Delete the book, only if it is not from the library */}
          {item.isAtHome && (
            <TouchableOpacity onPress={() => deleteBook(item)}>
              <AntDesign
                style={{marginLeft: 10, marginTop: 3}}
                name="closecircleo"
                size={23}
                color="black"
              />
            </TouchableOpacity>
          )}

          {/* Set the download icon */}
          {item.isFromLibrary && !item.isAtHome && (
            <TouchableOpacity onPress={() => downloadBook(item)}>
              <AntDesign
                style={{marginLeft: 10, marginTop: 3}}
                name="download"
                size={23}
                color="black"
              />
            </TouchableOpacity>
          )}
        </>
      );
    }
  }

  return (
    <Box bg="tertiary.100" flex={1}>
      <View style={styles.contentContainer}>
        <NativeBase.View>
          <Text fontSize={32} my={3}>
            {item.title.replace(new RegExp('_', 'g'), ' ')}
          </Text>
        </NativeBase.View>
        <Image
          source={{uri: `data:image/jpeg;base64,${item.source}`}}
          style={{height: 350, width: 150, resizeMode: 'contain'}}
        />
        <Text>Description: {item.description}</Text>
        <View
          style={{
            marginTop: 5,
            alignSelf: 'flex-end',
            flexDirection: 'row',
            paddingHorizontal: 15,
          }}
        >
          <ConditionalRender />
        </View>
      </View>
      <VStack mb="40" space={3}>
        <CustomButton
          title={t('book_info.start_reading')}
          onPress={() => startReading(item)}
          customWidth="70%"
        />
      </VStack>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalView}>
          <Text>{modalTitle}</Text>
          <View style={{width: '100%', height: 20}} />
        </View>
      </Modal>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  contentContainer: {
    flex: 1,

    alignItems: 'center',
    marginTop: 5,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  loginButtons: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 130,
  },
  modalView: {
    margin: 20,
    marginTop: 60,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
export default BookInfo;
