//imports

import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

//initial cards

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

//settings

const validateSelectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_disabled",
  inputErrorClass: "popup__form-input_type_error",
  errorClass: "popup__error_active",
};

//variables

const editButton = document.querySelector(".user__edit-button");
const userPopup = document.querySelector(".popup_type_profile");
const userName = document.querySelector(".user__name");
const userProfession = document.querySelector(".user__profession");
const nameInput = document.querySelector(".popup__form-input_type_name");
const profInput = document.querySelector(".popup__form-input_type_profession");
const formUserElement = document.querySelector(".popup__form_type_profile");
const formPlaceElement = document.querySelector(".popup__form_type_place");
const addPlaceButton = document.querySelector(".user__add-button");
const addPlacePopup = document.querySelector(".popup_type_place");
const cardTemplate = document.querySelector("#template").content;
const gallery = document.querySelector(".gallery");

//validators

const profileValidator = new FormValidator(formUserElement, validateSelectors);
profileValidator.enableValidation();

const placeValidator = new FormValidator(formPlaceElement, validateSelectors);
placeValidator.enableValidation();

//class instances

const popupWithProfileForm = new PopupWithForm(
  ".popup_type_profile",
  handleProfileFormSubmit
);
popupWithProfileForm.setEventListeners();

const popupWithAddCardForm = new PopupWithForm(
  ".popup_type_place",
  handlePlaceFormSubmit
);
popupWithAddCardForm.setEventListeners();

const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListeners();

const cardGallery = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardGallery.addItem(createCard({ item }));
    },
  },
  ".gallery"
);
cardGallery.renderItems();

const userInfo = new UserInfo({
  name: ".user__name",
  info: ".user__profession",
});

//functions

function handleProfileFormSubmit(values) {
  userInfo.setUserInfo(values);
}
function handlePlaceFormSubmit(values) {
  const item = {
    name: values.place,
    link: values.url,
  };
  cardGallery.addItem(createCard({ item }));
}
function createCard({ item }) {
  const cardInstance = new Card(
    {
      data: item,
      handleCardClick: ({ name, link }) => {
        popupWithImage.open({ name, link });
      },
    },
    cardTemplate
  );
  const card = cardInstance.generateCard();
  return card;
}

//event listeners
editButton.addEventListener("click", () => {
  popupWithProfileForm.open();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  profInput.value = userData.about;
});
addPlaceButton.addEventListener("click", () => {
  popupWithAddCardForm.open();
  placeValidator.toggleButtonState();
});
