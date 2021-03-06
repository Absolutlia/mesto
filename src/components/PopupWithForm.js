import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, { handleSubmit }) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
        this._submitButton = this._form.querySelector('.popup__submit-button');

    }

    _getInputValues() { // получаем значения инпутов
        const inputValues = {};
          this._inputs.forEach((input) => {
            inputValues[input.name] = input.value;
        })
        return inputValues;
    }

    setEventListeners() { // слушаем сабмиты форм
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._getInputValues());
        });
    }

    close() { 
        super.close();
        this._form.reset();
    }

    // .. Сохранение  ..
    isLoading(loading) {
        if (loading) {
            this._submitButton.textContent = 'Сохранение...';
        } else {
            this._submitButton.textContent = 'Сохранить';
        }
    }


}

