import { Asset } from "expo-asset";

export const data = [
  {
    title: "Decisions",
    language: "Pashto",
    description: "SDLFKJSDKFJLSDKJFLSKDJFLSKDJFLSKDJFLSKDJFL",
    //source: cover1()
    source: Asset.fromModule(
      require("../assets/images/bookCovers/disagreementAmongOccupations_cover.png")
    ).uri,
    bookPdfUrl: Asset.fromModule(
      require("../assets/bookpdf/pashto/Decisions Book Pashto Translation.pdf")
    ).uri,
  },
  {
    title: "Goat Dog Cow",
    language: "Pashto",
    description: "Goat Dog Cow Book",
    source: Asset.fromModule(
      require("../assets/images/bookCovers/GoatCoverPashto.png")
    ).uri,
    bookPdfUrl: Asset.fromModule(
      require("../assets/bookpdf/pashto/GoatDogCowBookPashto.pdf")
    ).uri,
  },

  {
    title: "Friends",
    language: "Pashto",
    description: "Friends Book",
    source: Asset.fromModule(
      require("../assets/images/bookCovers/FriendsCoverPashto.png")
    ).uri,
    bookPdfUrl: Asset.fromModule(
      require("../assets/bookpdf/pashto/Friends_Pashto_Final_Translation.pdf")
    ).uri,
  },
  {
    title: "Friends",
    language: "Somali",
    description: "Friends Book",
    source: Asset.fromModule(
      require("../assets/images/bookCovers/friends_cover.png")
    ).uri,
    bookPdfUrl: Asset.fromModule(
      require("../assets/bookpdf/somali/Friends_Somali_Final_Translation.pdf")
    ).uri,
  },
  {
    title: "Friends",
    language: "Xhosa",
    description: "Friends Book",
    source: Asset.fromModule(
      require("../assets/images/bookCovers/friends_cover.png")
    ).uri,
    bookPdfUrl: Asset.fromModule(
      require("../assets/bookpdf/xhosa/Friends_Xhosa_Final_Translation.pdf")
    ).uri,
  },
];

export const languageConfig = [
  {
    id: "SO",
    item: "Somali",
    label: "Somali",
  },

  {
    id: "XH",
    item: "Xhosa",
    label: "Xhosa",
  },
  {
    id: "PS",
    item: "Pashto",
    label: "Pashto",
  },
  {
    id: "UK",
    item: "Ukrainian",
    label: "Ukrainian",
  },
];

export const gradeConfig = [
  {
    label: "1",
  },
  {
    label: "2",
  },
  {
    label: "3",
  },
  {
    label: "4",
  },
  {
    label: "5",
  },
];
