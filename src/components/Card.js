export default class Card {
  constructor({ data, handleCardClick }, template) {
    this._template = template;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    this._cardElement = this._template.querySelector(".card").cloneNode(true);
    return this._cardElement;
  }
  _handleLikeButton() {
    const likeButton = this._card.querySelector(".card__like-button");
    likeButton.classList.toggle("card__like-button_active");
  }
  _handleDeleteButton() {
    this._card.remove();
  }
  _setEventListeners() {
    this._card
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });
    this._card
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });
    this._cardPicture.addEventListener("click", () =>
      this._handleCardClick({
        name: this._name,
        link: this._link,
      })
    );
  }
  generateCard() {
    this._card = this._getTemplate();
    this._cardPicture = this._card.querySelector(".card__image");
    this._cardPicture.src = this._link;
    this._cardPicture.alt = this._name + " photo";
    this._card.querySelector(".card__description").textContent = this._name;
    this._setEventListeners();
    return this._card;
  }
}
