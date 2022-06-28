import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    open(cardName, cardLink) {
    super.open();
    const image = this._popup.querySelector('.popup__big-image');
    const title = this._popup.querySelector('.popup__image-title');
    image.src = cardLink;
    title.textContent = cardName;
};
};

