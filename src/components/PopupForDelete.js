import Popup from "./Popup";

export default class PopupForDelete extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
  }
  openForDelete(cardId) {
    super.open();
    if (cardId) {
      this._data = cardId;
    }
    return this._data;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._data);
    });
  }
}
