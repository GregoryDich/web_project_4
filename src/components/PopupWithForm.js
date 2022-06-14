import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
  }
  _getInputValues() {
    const values = {};
    const inputs = this._popup.querySelectorAll(".popup__form-input");
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }
  close() {
    super.close();
    this._form.reset();
  }
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      const values = this._getInputValues();
      evt.preventDefault();
      this._handleSubmit(values);
      this.close();
    });
  }
}
