//imports

import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupForDelete from "../components/PopupForDelete.js";
import Api from "../components/Api.js";
import validateSelectors from "../utils/constants";
import {
  editButton,
  nameInput,
  profInput,
  formUserElement,
  formPlaceElement,
  formAvatarElement,
  addPlaceButton,
  editAvatarButton,
  cardTemplate,
} from "../utils/constants";

let currentUser = {};
//validators

const profileValidator = new FormValidator(formUserElement, validateSelectors);
profileValidator.enableValidation();

const placeValidator = new FormValidator(formPlaceElement, validateSelectors);
placeValidator.enableValidation();

const avatarValidator = new FormValidator(formAvatarElement, validateSelectors);
avatarValidator.enableValidation();

//class instances
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "545ebbe5-83ef-479f-9e3a-79ad4591aa10",
    "Content-Type": "application/json",
  },
});

const popupWithProfileForm = new PopupWithForm(
  ".popup_type_profile",
  handleProfileFormSubmit
);
popupWithProfileForm.setEventListeners();

const popupWithDeleteForm = new PopupForDelete(
  ".popup_type_delete",
  handleDeleteFormSubmit
);
popupWithDeleteForm.setEventListeners();

const popupWithAddCardForm = new PopupWithForm(
  ".popup_type_place",
  handlePlaceFormSubmit
);
popupWithAddCardForm.setEventListeners();

const popupWithEditAvatarForm = new PopupWithForm(
  ".popup_type_avatar",
  handleAvatarFormSubmit
);
popupWithEditAvatarForm.setEventListeners();

const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListeners();

const cardGallery = new Section(
  { renderer: (item) => createCard({ item }) },
  ".gallery"
);

const userInfo = new UserInfo({
  name: ".user__name",
  info: ".user__profession",
  avatar: ".user__avatar-image",
});

//api calls

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    currentUser = user;
    userInfo.setUserInfo(user);
    userInfo.setUserAvatar(user.avatar);
    cardGallery.renderItems(cards);
  })
  .catch((err) => console.log(err));

//functions

function handleAvatarFormSubmit(values) {
  popupWithEditAvatarForm.handleButtonText("Saving...");
  api
    .editAvatar(values)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      popupWithEditAvatarForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupWithEditAvatarForm.handleButtonText("Save");
    });
}
function handleProfileFormSubmit(values) {
  popupWithProfileForm.handleButtonText("Saving...");
  api
    .editProfile(values)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupWithProfileForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupWithProfileForm.handleButtonText("Save");
    });
}
function handleDeleteFormSubmit(card) {
  popupWithDeleteForm.handleButtonText("Saving...");
  api
    .deleteCard(card)
    .then((res) => {
      card.deleteCard();
      popupWithDeleteForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupWithDeleteForm.handleButtonText("Yes");
    });
}
function handlePlaceFormSubmit(values) {
  popupWithAddCardForm.handleButtonText("Saving...");
  api
    .addCard(values)
    .then((res) => {
      cardGallery.addItem(res);
      popupWithAddCardForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupWithAddCardForm.handleButtonText("Save");
    });
}
function createCard({ item }) {
  const cardInstance = new Card(
    {
      data: item,
      handleCardClick: ({ name, link }) => {
        popupWithImage.open({ name, link });
      },
      handleCardDelete: (cardElement) => {
        popupWithDeleteForm.openForDelete(cardElement);
      },
      handleCardLike: (isLiked, data) => {
        isLiked
          ? api
              .removeLike(data)
              .then((res) => {
                data.updateLikes(res);
              })
              .catch((err) => console.log(err))
          : api
              .addLike(data)
              .then((res) => {
                data.updateLikes(res);
              })
              .catch((err) => console.log(err));
      },
    },
    cardTemplate
  );
  const card = cardInstance.generateCard(currentUser);
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
editAvatarButton.addEventListener("click", () => {
  popupWithEditAvatarForm.open();
  avatarValidator.toggleButtonState();
});
