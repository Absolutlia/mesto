import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleSubmit) {
        // constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._submitButton = this._form.querySelector('.popup__submit-button')
        //this._handleSubmit = handleSubmit;

    }

    //публичный метод, вызываемый при сабмите формы, 
    //подменяет
    setSubmitAction(actionSubmit) {
        this._handleSubmit = actionSubmit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('click', (evt) => {
            console.log('deleteeeebuttonnnn')
            evt.preventDefault();
            this._handleSubmit();
        })
    }


}

