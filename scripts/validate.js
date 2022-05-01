const validateSelectors = {
    formSelector: ".popup__form",
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__form-button",
    inactiveButtonClass: "popup__form-button_disabled",
    inputErrorClass: "popup__form-input_type_error",
    errorClass: "popup__error_active"
};

function showInputError(form, input, settings) {
    const errorMessage = form.querySelector(`.${input.name}-error`);
    input.classList.add(settings.inputErrorClass);
    errorMessage.classList.add(settings.errorClass);
    errorMessage.textContent = input.validationMessage;
};

function hideInputError(form, input, settings) {
    const errorMessage = form.querySelector(`.${input.name}-error`);
    input.classList.remove(settings.inputErrorClass);
    errorMessage.classList.remove(settings.errorClass);
    errorMessage.textContent = "";
};

function hasInvalidInput(inputs) {
    return inputs.some((input) => {
        return !input.validity.valid;
    });
};

function checkInputValidity(form, input, settings) {
    if (input.validity.valid) {
        hideInputError(form, input, settings);
    } else {
        showInputError(form, input, settings);
    }
};

function toggleButtonState(inputs, button, settings) {
    if (hasInvalidInput(inputs)) {
        button.classList.add(settings.inactiveButtonClass);
        button.disabled = true;
    } else {
        button.classList.remove(settings.inactiveButtonClass);
        button.disabled = false;
    }
};

function setEventListeners(form, settings) {
    const button = form.querySelector(settings.submitButtonSelector);
    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    toggleButtonState(inputs, button, settings);
    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            checkInputValidity(form, input, settings);
            toggleButtonState(inputs, button, settings);
        });
    });
};

function enableValidation(settings) {
    const forms = Array.from(document.querySelectorAll(settings.formSelector));
    forms.forEach((form) => {
        form.addEventListener("submit", evt => {
            evt.preventDefault();
        });
        setEventListeners(form, settings);
    });
}
enableValidation(validateSelectors);
