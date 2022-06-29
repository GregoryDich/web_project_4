import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._data = {};
  }
  _getInputValues() {
    const inputs = this._popup.querySelectorAll(".popup__form-input");
    inputs.forEach((input) => {
      this._data[input.name] = input.value;
    });
    return this._data;
  }
  openForDelete(cardId) {
    super.open();
    if (cardId) {
      this._data = cardId;
    }
  }
  close() {
    super.close();
    this._form.reset();
  }
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      this._data = this._getInputValues();
      evt.preventDefault();
      this._handleSubmit(this._data);
      this.close();
    });
  }
}
