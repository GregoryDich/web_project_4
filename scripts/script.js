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

//initial content
initialCards.forEach((card) => {
  const cardElement = createCard(card);
  gallery.prepend(cardElement);
});

//functions
function openPopup(popup) {
  popup.classList.add("popup_opened");
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
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
}
function createCard(cardData) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__description").textContent = cardData.name;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", (evt) => {
      evt.target.classList.toggle("card__like-button_active");
    });
  cardElement;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => {
      cardElement.remove();
    });
  cardElement.querySelector(".card__image").addEventListener("click", () => {
    openPopup(imagePopup);
    imagePopup.querySelector(".popup__image").src = cardData.link;
    imagePopup.querySelector(".popup__image-title").textContent = cardData.name;
    imagePopup.querySelector(".popup__image").alt = cardData.name;
  });
  return cardElement;
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
});
closePlaceButton.addEventListener("click", () => {
  closePopup(addPlacePopup);
});
closeImageButton.addEventListener("click", () => {
  closePopup(imagePopup);
});
formUserElement.addEventListener("submit", handleProfileFormSubmit);
formPlaceElement.addEventListener("submit", handlePlaceFormSubmit);
