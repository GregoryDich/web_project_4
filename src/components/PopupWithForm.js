import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._data = {};
    this._inputs = this._popup.querySelectorAll(".popup__form-input");
  }
  _getInputValues() {
    this._inputs.forEach((input) => {
      this._data[input.name] = input.value;
    });
    return this._data;
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
    });
  }
}
