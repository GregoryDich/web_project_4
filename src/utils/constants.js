const validateSelectors = {
    formSelector: ".popup__form",
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__form-button",
    inactiveButtonClass: "popup__form-button_disabled",
    inputErrorClass: "popup__form-input_type_error",
    errorClass: "popup__error_active",
  };
  export default validateSelectors;


  //variables

const editButton = document.querySelector(".user__edit-button");
const nameInput = document.querySelector(".popup__form-input_type_name");
const profInput = document.querySelector(".popup__form-input_type_profession");
const formUserElement = document.querySelector(".popup__form_type_profile");
const formPlaceElement = document.querySelector(".popup__form_type_place");
const formAvatarElement = document.querySelector(".popup__form_type_avatar");
const addPlaceButton = document.querySelector(".user__add-button");
const editAvatarButton = document.querySelector(".user__avatar-overlay");
const cardTemplate = document.querySelector("#template").content;

export { editButton, nameInput, profInput, formUserElement, formPlaceElement, formAvatarElement, addPlaceButton, editAvatarButton, cardTemplate };