import { Asset } from "expo-asset";

export const data = [
  {
    title: "Decisions Pashto",
    language: "Pashto",
    description: "A village community makes a decision to change their lives",
    source: Asset.fromModule(
      require("../assets/images/bookCovers/disagreementAmongOccupations_cover.png")
    ).uri,
    bookPdfUrl: Asset.fromModule(
      require("../assets/bookpdf/pashto/Decisions Book Pashto Translation.pdf")
    ).uri,
  },
  {
    title: "Decisions Ukrainian",
    language: "Ukrainian",
    description: "A village community makes a decision to change their lives",
    source: Asset.fromModule(
      require("../assets/images/bookCovers/disagreementAmongOccupations_cover.png")
    ).uri,
    bookPdfUrl: Asset.fromModule(
      require("../assets/bookpdf/ukrainian/Decisions Book Ukrainian Translation.pdf")
    ).uri,
  },
  {
    title: "Decisions Somali",
    language: "Somali",
    description: "A village community makes a decision to change their lives",
    source: Asset.fromModule(
      require("../assets/images/bookCovers/disagreementAmongOccupations_cover.png")
    ).uri,
    bookPdfUrl: Asset.fromModule(
      require("../assets/bookpdf/somali/Decisions Book Somali Translation.pdf")
    ).uri,
  },
  {
    title: "Decisions Xhosa",
    language: "Xhosa",
    description: "A village community makes a decision to change their lives",
    source: Asset.fromModule(
      require("../assets/images/bookCovers/disagreementAmongOccupations_cover.png")
    ).uri,
    bookPdfUrl: Asset.fromModule(
      require("../assets/bookpdf/xhosa/Decisions Book Xhosa Translation.pdf")
    ).uri,
  },
  {
    title: "Goat Dog Cow Pashto",
    language: "Pashto",
    description:
      "Three friends go on a journey in a taxi. When it comes time to pay, problems arise.",
    source: Asset.fromModule(
      require("../assets/images/bookCovers/GoatCoverPashto.png")
    ).uri,
    bookPdfUrl: Asset.fromModule(
      require("../assets/bookpdf/pashto/GoatDogCowBookPashto.pdf")
    ).uri,
  },
  {
    title: "Goat Dog Cow Hindi",
    language: "Hindi",
    description:
      "Three friends go on a journey in a taxi. When it comes time to pay, problems arise.",
    source: Asset.fromModule(
      require("../assets/images/bookCovers/goatDogandCow_cover.png")
    ).uri,
    bookPdfUrl: Asset.fromModule(
      require("../assets/bookpdf/hindi/GoatDogCowBookHindi.pdf")
    ).uri,
  },
  {
    title: "Goat Dog Cow Ukrainian",
    language: "Ukrainian",
    description:
      "Three friends go on a journey in a taxi. When it comes time to pay, problems arise.",
    source: Asset.fromModule(
      require("../assets/images/bookCovers/goatDogandCow_cover.png")
    ).uri,
    bookPdfUrl: Asset.fromModule(
      require("../assets/bookpdf/ukrainian/GoatDogCowBookUkrainian.pdf")
    ).uri,
  },
  {
    title: "Goat Dog Cow Somali",
    language: "Somali",
    description:
      "Three friends go on a journey in a taxi. When it comes time to pay, problems arise.",
    source: Asset.fromModule(
      require("../assets/images/bookCovers/goatDogandCow_cover.png")
    ).uri,
    bookPdfUrl: Asset.fromModule(
      require("../assets/bookpdf/somali/GoatDogCowBookSomali.pdf")
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
    title: "Friends Somali",
    language: "Somali",
    description: "Simo makes new friends",
    source: Asset.fromModule(
      require("../assets/images/bookCovers/friends_cover.png")
    ).uri,
    bookPdfUrl: Asset.fromModule(
      require("../assets/bookpdf/somali/Friends_Somali_Final_Translation.pdf")
    ).uri,
  },
  {
    title: "Friends Xhosa",
    language: "Xhosa",
    description: "Simo makes new friends",
    source: Asset.fromModule(
      require("../assets/images/bookCovers/friends_cover.png")
    ).uri,
    bookPdfUrl: Asset.fromModule(
      require("../assets/bookpdf/xhosa/Friends_Xhosa_Final_Translation.pdf")
    ).uri,
  },
  {
    title: "Friends Hindi",
    language: "Hindi",
    description: "Simo makes new friends",
    source: Asset.fromModule(
      require("../assets/images/bookCovers/friends_cover.png")
    ).uri,
    bookPdfUrl: Asset.fromModule(
      require("../assets/bookpdf/hindi/Friends_Hindi_Final_Translation.pdf")
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
  {
    id: "HI",
    item: "Hindi",
    label: "Hindi",
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
