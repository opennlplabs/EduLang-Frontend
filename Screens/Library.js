import { useState } from "react";
import { ScrollView } from "react-native";
import { Header } from "./components/Header";
import { HeaderSection } from "./components/HeaderSection";
import BookList from "./components/BookList";
import { useEffect } from "react";
import { getCloudBooks } from "./StorageUtils/BookStorage";
import { useIsFocused } from "@react-navigation/native";
import FeedbackModal from "./components/FeedBackModal";
import Background from "./components/Background";
import { Box, Center } from "native-base";

export const Library = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [feedbackModal, setfeedbackModal] = useState(false);
  const isFocused = useIsFocused();

  useEffect(async () => {
    if (isFocused === true) {
      const data = await getCloudBooks();
      setData(data);
      searchBarChange(data, "");
      setIsLoading(false);
    }
  }, [isFocused]);

  function searchBarChange(dataSearch, text) {
    setSearchData(
      dataSearch.filter((book) => {
        let text1 = text.toLowerCase();
        return text ? book.title.toLowerCase().includes(text1) : true;
      })
    );
  }

  return (
    <Box bg="tertiary.100" flex={1}>
      <HeaderSection title="Library Books" />
      <Background />
      <Header
        smallMarginTop
        title="Library"
        onSearchBarChange={(text) => searchBarChange(data, text)}
        onFeedbackPress={() => setfeedbackModal(true)}
      />

      <BookList
        item={searchData}
        navigation={navigation}
        NoMessage="No library books found at the moment."
        isLoading={isLoading}
      />

      <FeedbackModal
        visible={feedbackModal}
        hideModal={() => setfeedbackModal(false)}
      />
    </Box>
  );
};
