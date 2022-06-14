export class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
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
    
    createCard() {
        this._cardElement = this._getTemplate();
        this._setEventListeners();

        this._cardImage = this._cardElement.querySelector('.element__image');
        this._cardTitle = this._cardElement.querySelector('.element__title');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;

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
            this._handleCardClick(this._name, this._link);
        });
    }
}
