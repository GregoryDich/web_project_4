//variables
const editButton = document.querySelector(".user__edit-button");
const popup = document.querySelector(".popup");
const userName = document.querySelector(".user__name");
const userProfession = document.querySelector(".user__profession");
const nameInput = document.querySelector(".popup__form-input_type_name");
const profInput = document.querySelector(".popup__form-input_type_profession");
const closeButton = document.querySelector(".popup__close-button");
const formElement = document.querySelector(".popup__form");

//functions
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userProfession.textContent = profInput.value;
  popup.classList.remove("popup_opened");
}

//event listeners
editButton.addEventListener("click", () => {
  popup.classList.add("popup_opened");
  nameInput.value = userName.textContent;
  profInput.value = userProfession.textContent;
});
closeButton.addEventListener("click", () => {
  popup.classList.remove("popup_opened");
});
formElement.addEventListener("submit", handleProfileFormSubmit);
