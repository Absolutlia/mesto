export class FormValidator {
    constructor(settings, form) {
        this._settings = settings;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector)); //все инпуты
        this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);

    }


    //Ф-я, кот добавляет класс с ошибкой
    _showInputError(inputElement, errorMessage) {
        const { inputErrorClass, errorClass } = this._settings;

        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage; //заменим содержимое span с ошибкой на переданный параметр
        errorElement.classList.add(errorClass); //показываем сообщение об ошибке
    };

    //ф-я удаления класса с ошибкой
    _hideInputError(inputElement) {
        const { inputErrorClass, errorClass } = this._settings;

        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = '';
        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorClass);

    };

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            //передадим сообще об ошибке
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement)
        };
    };


    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    disableSubmitButton() {
        this._buttonElement.classList.add(this._settings.inactiveButtonClass);
        this._buttonElement.disabled = 'disabled';
    }

    _enableSubmitButton() {
        this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
        this._buttonElement.disabled = '';
    }

    toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            this.disableSubmitButton(buttonElement);
        } else {
            this._enableSubmitButton(buttonElement);
        };
    };

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this.toggleButtonState();
            });
        });
    };

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    };

    resetErrors() {
        this._form.reset();
        this._inputList.forEach((inputElement) => {
               this._hideInputError(inputElement);
        });
        this.toggleButtonState();
    }

};

