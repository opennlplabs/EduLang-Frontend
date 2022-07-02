import { Asset } from "expo-asset";

export const data = [
  {
    bookId: 0,
    title: "Decisions Pashto",
    language: "Pashto",
    description: "A village community makes a decision to change their lives",
    source: Asset.fromModule(
      require("../assets/images/bookCovers/disagreementAmongOccupations_cover.png")
    ).uri,
    bookPdfUrl: Asset.fromModule(
      require("../assets/bookpdf/pashto/DecisionsBookPashtoTranslation.pdf")
    ).uri,
  },
  {
    bookId: 1,
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
    bookId: 2,
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
    bookId: 3,
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
    bookId: 4,
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
    bookId: 5,
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
    bookId: 6,
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
    bookId: 7,
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
    bookId: 8,
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
    bookId: 9,
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
    bookId: 10,
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
    bookId: 11,
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
