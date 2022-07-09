export class Card {
    constructor(cardName, cardLink, likes, cardSelector, handleCardClick, handleDeleteClick) {
        this._cardName = cardName;
        this._cardLink = cardLink;
        this._cardSelector = cardSelector;

        this._handleCardClick = handleCardClick; //приняли снаружи
        this._likes = likes;
        this._handleDeleteClick = handleDeleteClick;
          }

    //Метод удаляет карточку из DOM

    //вернет ID карточки

    //удаяет класс на кнопке лайк
    _handleLikeCard = () => {
        this._likeButton.classList.toggle('element__button-like_active');
    };

    setLikes(newLike) {
        this._likes = newLike;
        const likeCountElement = this._cardElement.querySelector('.element__like-count')
        likeCountElement.textContent = this._likes.length;
    }

    // _handleDeleteCard = () => {
    //     this._cardElement.remove();
    //     this._cardElement = null;
    // };
// button.addEventListener('click', card._handleDeleteCard())


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
        this.setLikes(this._likes);
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
            this._handleDeleteClick();
        });
        this._cardImage.addEventListener("click", () => {
            this._handleCardClick(this._cardName, this._cardLink);
        });
    }
}

