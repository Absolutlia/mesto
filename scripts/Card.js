import { bigImage, bigImageTitle, popupOpenImage, openPopup } from './utils.js';

export class Card {
    constructor(data) {
        //this._cardSelector = cardSelector; //document.querySelector('.card-template').content;
        this._name = data.name;
        this._link = data.link;
    }

    _handleLikeCard = () => {
        this._cardElement.querySelector('.element__button-like').classList.toggle('element__button-like_active');
    };

    _handleDeleteCard = () => {
        this._cardElement.remove();
    };

    _getTemplate() {
        const element = document
            .querySelector('.card-template')
            .content
            .querySelector('.element')
            .cloneNode(true);
        return element;
    };

    _handleViewImage = () => {
        openPopup(popupOpenImage);
        bigImage.src = this._link;
        bigImage.alt = this._name;
        bigImageTitle.textContent = this._name;
    }

    createCard() {
        this._cardElement = this._getTemplate();
        this._cardImage = this._cardElement.querySelector(".element__image");
        this._setEventListeners();

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardElement.querySelector('.element__title').textContent = this._name;

        return this._cardElement;
    }

    _setEventListeners() {
        this._cardElement.querySelector(".element__button-like").addEventListener("click", () => {
            this._handleLikeCard();
        });
        this._cardElement.querySelector(".element__trashbin").addEventListener("click", () => {
            this._handleDeleteCard();
        });
        this._cardImage.addEventListener("click", () => {
            this._handleViewImage();
        });
    }
}
