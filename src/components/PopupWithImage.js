import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open({ name, link }) {
    super.open();
    this._picture = this._popup.querySelector(".popup__image");
    this._picture.src = link;
    this._picture.alt = name + " photo";
    this._title = this._popup.querySelector(".popup__image-title");
    this._title.textContent = name;
  }
}
