import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__big-image');
        this._title = this._popup.querySelector('.popup__image-title');
    }

    open(cardName, cardLink) {
        super.open();
        this._image.alt = cardName;
        this._image.src = cardLink;
        this._title.textContent = cardName;
    };
};

