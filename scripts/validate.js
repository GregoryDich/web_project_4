const validateSelectors = {
    formSelector: ".popup__form",
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__form-button",
    inactiveButtonClass: "popup__form-button_disabled",
    inputErrorClass: "popup__form-input_type_error",
    errorClass: "popup__error_active"
};
const {formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass} = validateSelectors;

function showInputError(form, input) {
    const errorMessage = form.querySelector(`.${input.name}-error`);
    input.classList.add(inputErrorClass);
    errorMessage.classList.add(errorClass);
    errorMessage.textContent = input.validationMessage;
};

function hideInputError(form, input) {
    const errorMessage = form.querySelector(`.${input.name}-error`);
    input.classList.remove(inputErrorClass);
    errorMessage.classList.remove(errorClass);
    errorMessage.textContent = "";
};

function hasInvalidInput(inputs) {
    return inputs.some((input) => {
        return !input.validity.valid;
    });
};

function checkInputValidity(form, input) {
    if (input.validity.valid) {
        hideInputError(form, input);
    } else {
        showInputError(form, input);
    }
};

function toggleButtonState(inputs, button) {
    if (hasInvalidInput(inputs)) {
        button.classList.add(inactiveButtonClass);
        button.disabled = true;
    } else {
        button.classList.remove(inactiveButtonClass);
        button.disabled = false;
    }
};

function setEventListeners(form) {
    const button = form.querySelector(submitButtonSelector);
    const inputs = Array.from(form.querySelectorAll(inputSelector));
    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            checkInputValidity(form, input);
            toggleButtonState(inputs, button);
        });
    });
};

function enableValidation() {
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach((form) => {
        form.addEventListener("submit", evt => {
            evt.preventDefault();
        });
        setEventListeners(form);
    });
}
enableValidation();
