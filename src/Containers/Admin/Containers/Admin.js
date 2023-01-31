import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import BookList from '../../../Components/BookList.js';
import {Header} from '../../../Components/Header';
import {HeaderSection} from '../../../Components/HeaderSection.js';
//import { Storage } from "expo-storage";
// import {getAdminBooks} from './StorageUtils/BookStorage';

async function getStorage(key, array = false) {
  var val = JSON.parse(await Storage.getItem({key: key}));
  if (array === true) {
    val = Array.from(val);
  }
  return val;
}
const Admin = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const checkIsAdmin = async () => {
  //     const isAdmin = await getStorage('isAdmin');
  //     setIsAdmin(isAdmin);
  //     if (isAdmin) {
  //       const data = await getAdminBooks();
  //       setData(data);
  //       updateSearchData(data, '');
  //       setIsLoading(false);
  //     }
  //   };
  //   checkIsAdmin();
  // }, []);

  function updateSearchData(dataFilter, text) {
    setSearchData(
      dataFilter.filter(book => {
        let text1 = text.toLowerCase();
        return text ? book.title.toLowerCase().includes(text1) : true;
      })
    );
  }

  function redirectPage() {
    navigation.navigate({
      name: 'Add Book: Info',
      params: {navigateTo: 'Add PDF'},
    });
  }

  if (isAdmin) {
    return (
      <ScrollView>
        <Header
          smallMarginTop
          title="Admin Page"
          onSearchBarChange={text => updateSearchData(data, text)}
        />
        <HeaderSection
          title="Books Under Review"
          buttonTitle="Add PDF"
          onButtonClick={redirectPage}
        />
        <BookList
          item={searchData}
          navigation={navigation}
          NoMessage="No library books found at the moment."
          isLoading={isLoading}
        />
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.NewView}>
        <Text>You are not admin!</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  NewView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Admin;
