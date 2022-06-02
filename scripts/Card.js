import { imageCaption, imagePopup} from "./script.js";
import { openPopup } from "./utils.js";

export default class Card {
    constructor(data, template) {
        this._template = template;
        this._name = data.name;
        this._link = data.link;
    }
    _getTemplate() {
        this._cardElement = this._template
            .querySelector('.card')
            .cloneNode(true);
        return this._cardElement;
    }
   
    _handleImagePopup(e) {
        const popupImage = document.querySelector('.popup__image');
        const popupTitle = document.querySelector('.popup__image-title');
        popupImage.src = e.target.src;
        popupTitle.alt = e.target.alt;
        imageCaption.textContent = this._name;
        openPopup(imagePopup);
    }
    _handleLikeButton() {
        const likeButton = this._card.querySelector('.card__like-button');
        likeButton.classList.toggle('card__like-button_active');
    }
    _handleDeleteButton() {
        this._card.remove();
    }
    _setEventListeners() {
        this._card.querySelector('.card__like-button').addEventListener('click', () => {
            this._handleLikeButton();
        });
        this._card.querySelector('.card__delete-button').addEventListener('click', () => {
            this._handleDeleteButton();
        });
        this._cardPicture.addEventListener('click', (e) => {
            this._handleImagePopup(e);
        });
    }
    generateCard() {
        this._card = this._getTemplate();
        this._cardPicture = this._card.querySelector('.card__image');
        this._cardPicture.src = this._link;
        this._cardPicture.alt = this._name + " photo";
        this._card.querySelector('.card__description').textContent = this._name;
        this._setEventListeners();
        return this._card;
    }
}
