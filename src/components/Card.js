export class Card {
    constructor(cardName, cardLink, cardSelector, handleCardClick) {
        this._cardName = cardName;
        this._cardLink = cardLink;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick; //приняли снаружи
    }

    _handleLikeCard = () => {
        this._likeButton.classList.toggle('element__button-like_active');
    };

    _handleDeleteCard = () => {
        this._cardElement.remove();
    };

    _getTemplate() {
        const element = document.querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return element;
    };

    generateCard() {
        this._cardElement = this._getTemplate();
        this._cardImage = this._cardElement.querySelector('.element__image');
        this._cardTitle = this._cardElement.querySelector('.element__title');
        this._cardImage.src = this._cardLink;
        this._cardImage.alt = this._cardName;
        this._cardTitle.textContent = this._cardName;

        this._setEventListeners();
        return this._cardElement;
    }

    _setEventListeners() {
        this._likeButton = this._cardElement.querySelector('.element__button-like');
        this._deleteButton = this._cardElement.querySelector('.element__trashbin');
        this._cardImage = this._cardElement.querySelector('.element__image');

        this._likeButton.addEventListener("click", () => {
            this._handleLikeCard();
        });
        this._deleteButton.addEventListener("click", () => {
            this._handleDeleteCard();
        });
        this._cardImage.addEventListener("click", () => {
            this._handleCardClick(this._cardName, this._cardLink);
        });
    }
}
