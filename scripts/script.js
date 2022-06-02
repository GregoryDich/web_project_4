//imports 

import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";

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
  errorClass: "popup__error_active"
};

//variables

const editButton = document.querySelector(".user__edit-button");
const userPopup = document.querySelector(".popup_type_profile");
const userName = document.querySelector(".user__name");
const userProfession = document.querySelector(".user__profession");
const nameInput = document.querySelector(".popup__form-input_type_name");
const profInput = document.querySelector(".popup__form-input_type_profession");
const closeProfileButton = document.querySelector(
  ".popup__close-button_type_profile"
);
const closePlaceButton = document.querySelector(
  ".popup__close-button_type_place"
);
const closeImageButton = document.querySelector(
  ".popup__close-button_type_image"
);
const placeTitle = document.querySelector(".popup__form-input_type_title");
const placeUrl = document.querySelector(".popup__form-input_type_url");
const formUserElement = document.querySelector(".popup__form_type_profile");
const formPlaceElement = document.querySelector(".popup__form_type_place");
const addPlaceButton = document.querySelector(".user__add-button");
const addPlacePopup = document.querySelector(".popup_type_place");
const imagePopup = document.querySelector(".popup_type_image");
const cardTemplate = document.querySelector("#template").content;
const gallery = document.querySelector(".gallery");
const formPlaceSubmitButton = formPlaceElement.querySelector(
  ".popup__form-button"
);
const imageCaption = imagePopup.querySelector(".popup__image-title");

//validators

const profileValidator = new FormValidator(formUserElement, validateSelectors);
profileValidator.enableValidation();

const placeValidator = new FormValidator(formPlaceElement, validateSelectors);
placeValidator.enableValidation();

//functions

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userProfession.textContent = profInput.value;
  closePopup(userPopup);
}
function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  gallery.prepend(createCard({ name: placeTitle.value, link: placeUrl.value }));
  closePopup(addPlacePopup);
  formPlaceElement.reset();
}
function createCard(cardData) {
    const cardInstance = new Card(cardData, cardTemplate);
    const card = cardInstance.generateCard();
    return card;
}

//event listeners
editButton.addEventListener("click", () => {
  openPopup(userPopup);
  nameInput.value = userName.textContent;
  profInput.value = userProfession.textContent;
});
closeProfileButton.addEventListener("click", () => {
  closePopup(userPopup);
});
addPlaceButton.addEventListener("click", () => {
  openPopup(addPlacePopup);
  placeValidator.toggleButtonState();
});
closePlaceButton.addEventListener("click", () => {
  closePopup(addPlacePopup);
});
closeImageButton.addEventListener("click", () => {
  closePopup(imagePopup);
});
formUserElement.addEventListener("submit", handleProfileFormSubmit);
formPlaceElement.addEventListener("submit", handlePlaceFormSubmit);


//initial content
initialCards.forEach((card) => {
  const cardElement = createCard(card);
  gallery.prepend(cardElement);
});

//exports
export { imagePopup, imageCaption };