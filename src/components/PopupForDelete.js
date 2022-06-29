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
  }
  setEvetntListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      const values = this._data;
      evt.preventDefault();
      this._handleSubmit(values);
      this.close();
    });
  }
}
