export default class Card {
  constructor(
    { data, handleCardClick, handleCardDelete, handleCardLike },
    template
  ) {
    this._template = template;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;
    this._likes = data.likes;
    this._owner = data.owner._id;
    this._id = data._id;
  }
  _handleDeleteButtonVisibility(user) {
    if (this._owner !== user._id) {
      this._deleteButton.style.display = "none";
    }
  }
  deleteCard() {
    this._cardElement.remove();
  }
  updateLikes(res) {
    this._likeCounter.textContent = res.likes.length;
    this._likeButton.classList.toggle("card__like-button_active");
  }
  getLikesCount(user) {
    this._likes.some((el) => el._id === user._id) &&
      this._likeButton.classList.add("card__like-button_active");
    this._likeCounter.textContent =
      this._likes.length < 1 ? "" : this._likes.length;
  }
  _getTemplate() {
    this._cardElement = this._template.querySelector(".card").cloneNode(true);
    return this._cardElement;
  }
  _handleLikeButton() {
    const isLiked = this._likeButton.classList.contains(
      "card__like-button_active"
    );
    this._handleCardLike(isLiked, this);
  }
  _setEventListeners() {
    this._likeButton
      .addEventListener("click", () => {
        this._handleLikeButton();
      });
    this._deleteButton.addEventListener("click", () => {
      this._handleCardDelete(this);
    });
    this._cardPicture.addEventListener("click", () =>
      this._handleCardClick({
        name: this._name,
        link: this._link,
      })
    );
  }
  generateCard(user) {
    this._card = this._getTemplate();
    this._cardPicture = this._card.querySelector(".card__image");
    this._cardPicture.src = this._link;
    this._deleteButton = this._card.querySelector(".card__delete-button");
    this._likeCounter = this._card.querySelector(".card__like-counter");
    this._likeButton = this._card.querySelector(".card__like-button");
    this.getLikesCount(user);
    this._handleDeleteButtonVisibility(user);
    this._cardPicture.alt = this._name + " photo";
    this._card.querySelector(".card__description").textContent = this._name;
    this._setEventListeners(user);
    return this._card;
  }
}
