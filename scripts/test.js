
// файл валидации
const showInputError = (formElement, inputElement, errorMessage, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorTextClass);
}

const hideInputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.classList.remove(obj.errorTextClass);
    errorElement.textContent =" ";
}

const hasInvalidInput = (inputList) => {
    return inputList.some ((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const disableButtonElement = (buttonElement, obj) => {
    buttonElement.classList.add(obj.inactiveButtonClass);
    buttonElement.disabled = true;
}

const activeButtonElement = (buttonElement, obj) => {
    buttonElement.classList.remove(obj.inactiveButtonClass);
    buttonElement.disabled = false;
}

const toggleButtonState = (inputList, buttonElement, obj) => {
    if (hasInvalidInput(inputList)) {
        disableButtonElement(buttonElement, obj);
    } else {
        activeButtonElement(buttonElement, obj);
    }
}

const isValid = (formElement, inputElement, obj) => {
    if (!inputElement.validity.valid) {
        showInputError (formElement, inputElement, inputElement.validationMessage, obj);
    } else {
        hideInputError (formElement, inputElement, obj);
    }
};

const setEventListeners = (formElement, obj) => {
    const inputList = Array.from(formElement.querySelectorAll (obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, obj);
    inputList.forEach ((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, obj);
            toggleButtonState(inputList, buttonElement, obj);
        });
    });
};

const enableValidation = (obj) => {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, obj);
    });
}

enableValidation({
    formSelector: '.popup__container-form',
    inputSelector: '.popup__container-form-input',
    submitButtonSelector: '.popup__container-form-button',
    inactiveButtonClass: 'popup__container-form-button_inactive',
    inputErrorClass: 'popup__container-form-input_error',
    errorTextClass: 'popup__container-form-input-text_error'
});
--------------------



const elementsCardsContainer = document.querySelector('.elements__cards');
const cards = document.querySelector('#cards').content;
const buttonElement = document.querySelector('.popup__container-form-button');

const formElementList = {
    formSelector: '.popup__container-form',
    inputSelector: '.popup__container-form-input',
    submitButtonSelector: '.popup__container-form-button',
    inactiveButtonClass: 'popup__container-form-button_inactive',
    inputErrorClass: 'popup__container-form-input_error',
    errorTextClass: 'popup__container-form-input-text_error'
};


// файл валидации
const showInputError = (formElement, inputElement, errorMessage, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorTextClass);
}

const hideInputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.classList.remove(obj.errorTextClass);
    errorElement.textContent =" ";
}

const hasInvalidInput = (inputList) => {
    return inputList.some ((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const disableButtonElement = (buttonElement, obj) => {
    buttonElement.classList.add(obj.inactiveButtonClass);
    buttonElement.disabled = true;
}

const activeButtonElement = (buttonElement, obj) => {
    buttonElement.classList.remove(obj.inactiveButtonClass);
    buttonElement.disabled = false;
}

const toggleButtonState = (inputList, buttonElement, obj) => {
    if (hasInvalidInput(inputList)) {
        disableButtonElement(buttonElement, obj);
    } else {
        activeButtonElement(buttonElement, obj);
    }
}

const isValid = (formElement, inputElement, obj) => {
    if (!inputElement.validity.valid) {
        showInputError (formElement, inputElement, inputElement.validationMessage, obj);
    } else {
        hideInputError (formElement, inputElement, obj);
    }
};

const setEventListeners = (formElement, obj) => {
    const inputList = Array.from(formElement.querySelectorAll (obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, obj);
    inputList.forEach ((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, obj);
            toggleButtonState(inputList, buttonElement, obj);
        });
    });
};

const enableValidation = (obj) => {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, obj);
    });
}

enableValidation({
    formSelector: '.popup__container-form',
    inputSelector: '.popup__container-form-input',
    submitButtonSelector: '.popup__container-form-button',
    inactiveButtonClass: 'popup__container-form-button_inactive',
    inputErrorClass: 'popup__container-form-input_error',
    errorTextClass: 'popup__container-form-input-text_error'
});

---------------------------------------------------------

const setInputInvalid = (config, errorMessage, input) => {
    errorMessage.textContent = input.validationMessage;
    input.classList.add(config.inputErrorClass);
};

const checkInputValidity = (config, form, input) => {
    const errorMessage = form.querySelector(`#error-${input.id}`);
    if (input.validity.valid) {
        setInputValid(config, errorMessage, input);
    } else {
        setInputInvalid(config, errorMessage, input);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
        return !input.validity.valid;
    });
};

const setEventListeners = (config, form) => {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    const button = form.querySelector(config.submitButtonSelector);
    inputList.forEach((input) => {
        input.addEventListener("input", () => {
            checkInputValidity(config, form, input);
            toggleButtonState(config, inputList, button);
        });
    });
};

const disableButton = (config, button) => {
    button.setAttribute("disabled", true);
    button.classList.add(config.inactiveButtonClass);
}

const enableButton = (config, button) => {
    button.removeAttribute("disabled");
    button.classList.remove(config.inactiveButtonClass);
}

const toggleButtonState = (config, inputList, button) => {
    if (hasInvalidInput(inputList)) {
        disableButton(config, button);
    } else {
        enableButton(config, button);
    }
};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((form) => {
        form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListeners(config, form);
    });
};

enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button-save",
    inactiveButtonClass: "popup__button-save_disabled",
    inputErrorClass: "popup__error",
    errorClass: "popup__error_visible",
});




