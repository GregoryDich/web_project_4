export default class FormValidator {
    constructor (form, settings) {
        this._settings = settings;
        this._form = form;
    }
    _showInputError(input) {
        this._error = this._form.querySelector(`.${input.name}-error`);
        input.classList.add(this._settings.inputErrorClass);
        this._error.classList.add(this._settings.errorClass);
        this._error.textContent = input.validationMessage;
    };
    _hideInputError(input) {
        this._error = this._form.querySelector(`.${input.name}-error`);
        input.classList.remove(this._settings.inputErrorClass);
        this._error.classList.remove(this._settings.errorClass);
        this._error.textContent = "";
    };
    _hasInvalidInput(inputs) {
        return inputs.some((input) => {
            return !input.validity.valid;
        });
    };
    _checkInputValidity(input) {
        if (input.validity.valid) {
            this._hideInputError(input);
        } else {
            this._showInputError(input);
        }
    };
    toggleButtonState() {
        if (this._hasInvalidInput(this._inputs)) {
            this._button.classList.add(this._settings.inactiveButtonClass);
            this._button.disabled = true;
        } else {
            this._button.classList.remove(this._settings.inactiveButtonClass);
            this._button.disabled = false;
        }
    };
    _setEventListeners() {
        this._button = this._form.querySelector(this._settings.submitButtonSelector);
        this._inputs = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        this.toggleButtonState();
        this._inputs.forEach((input) => {
            input.addEventListener("input", () => {
                this._checkInputValidity(input);
                this.toggleButtonState();
            }); 
        });
    };
    enableValidation() {
            this._form.addEventListener("submit", evt => {
                evt.preventDefault();
            });
            this._setEventListeners();
    }
}

