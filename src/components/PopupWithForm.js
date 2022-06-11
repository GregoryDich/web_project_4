import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
  }
  getInputValues() {
    this._values = {};
    this._inputs = this._popup.querySelectorAll(".popup__form-input");
    this._inputs.forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }
  close() {
    super.close();
    this._form.reset();
  }
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
      this.close();
    });
  }
}
