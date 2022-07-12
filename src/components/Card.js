
export class Card {
    constructor(cardName, cardLink, likes, cardId, userId, ownerId, cardSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
        this._cardName = cardName;
        this._cardLink = cardLink;
        this._likes = likes;
        this._cardId = cardId;
        this._userId = userId; //получаем из профиля
        this._ownerId = ownerId;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick; //приняли снаружи
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
        }

    _putLikeCard() {
        this._likeButton.classList.add('element__button-like_active');
    };

    _deleteLikeCard() {
        this._likeButton.classList.remove('element__button-like_active');
    };

    isLiked() {
        const userHasLikedCard = this._likes.some(user => user._id === this._userId);
        return userHasLikedCard;
    }

    _handleLikeIcon() {
        this._cardElement.querySelector('.element__button-like').
            classList.toggle('element__button-like_active')
    }


    setLikes(newLikes) {
        this._likes = newLikes;
        const likeCountElement = this._cardElement.querySelector('.element__like-count')
        likeCountElement.textContent = this._likes.length;

        if (this.isLiked()) {
            this._putLikeCard();
        } else {
            this._deleteLikeCard();
         }
    }

    handleDeleteCard = () => {
        this._cardElement.remove();
        this._cardElement = null;
    };

    //возвращает шаблон карточки из DOM
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
        this._deleteButton = this._cardElement.querySelector('.element__trashbin');
        this._likeButton = this._cardElement.querySelector('.element__button-like');
        this.setLikes(this._likes);
        this._setEventListeners();
        if (this._ownerId !== this._userId) {
            this._deleteButton.style.display = 'none'
        }

        const userHasLikeCard = this._likes.some(user => user._id === this._userId)
        if (userHasLikeCard) {
            this._handleLikeIcon();
        }

        return this._cardElement;
    }

    _setEventListeners() {
        this._cardImage = this._cardElement.querySelector('.element__image');
        this._likeButton.addEventListener("click", () => {
            this._handleLikeClick(this._cardId);
        });
        this._deleteButton.addEventListener("click", () => {
            this._handleDeleteClick(this._cardId);
        });

        this._cardImage.addEventListener("click", () => {
            this._handleCardClick(this._cardName, this._cardLink);
        });
    }
}