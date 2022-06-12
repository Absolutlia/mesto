import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { closePopupOverlay, openPopup, closePopup, popupOpenImage } from './utils.js'; //check it!, м б по функциям

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input-type-error',
  errorClass: 'popup__input-error'
};

//popups
export const popupEditProfile = document.querySelector('.popup_edit-profile');
export const popupAddCards = document.querySelector(".popup_add-cards");

//кнопки открытия попапов
export const editProfileButton = document.querySelector(".profile__edit-button");
export const addCardButton = document.querySelector(".profile__add-button");

//кнопки закрытия попапов
export const closeProfileButton = popupEditProfile.querySelector(
  ".popup__close-button_profile"
);
export const closeAddCardButton = popupAddCards.querySelector(
  ".popup__close-button_card"
);
export const closeImageButton = popupOpenImage.querySelector(".popup__close-button_image");

//profile
export const profile = document.querySelector(".profile");

export const profileTitle = profile.querySelector(".profile__title");
export const profileSubtitle = profile.querySelector(".profile__subtitle");
export const nameInput = popupEditProfile.querySelector(".popup__input_type_name");
export const jobInput = popupEditProfile.querySelector(".popup__input_type_info");

//форма для новой карточки
export const inputCardName = popupAddCards.querySelector(".popup__input_card_name");
export const inputCardLink = popupAddCards.querySelector(".popup__input_card_url");

//template
export const elementList = document.querySelector(".elements__list"); //изначальный список карточек ul
export const cardTemplate = document.querySelector('.card-template').content;

//формы
export const formProfile = popupEditProfile.querySelector(".popup__form_profile"); /************* */
export const formAddCard = document.querySelector(".popup__add-cards"); //******

const cardContainer = document.querySelector('.elements'); //список всех карточек

initialCards.forEach((item) => { // функция-итератор карточек
  cardContainer.append(renderCard(item.cardName, item.cardLink)); // что-бы не дублировать код используем функцию createCard
});

function renderCard(cardName, cardLink) {
  const listItem = new Card(cardName, cardLink, '.card-template');
  const newCard = listItem.createCard();
  return newCard;
}

const editProfileValidator = new FormValidator(validationConfig, formProfile);
const addCardValidator = new FormValidator(validationConfig, formAddCard);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
  editProfileValidator.disableSubmitButton(popupEditProfile);
}

//функция добавления новой карточки
const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();

  const newAddedCard = { cardName: inputCardName.value, cardLink: inputCardLink.value };
  renderCard(newAddedCard);

  inputCardName.value = ''; //очищение инпутов
  inputCardLink.value = '';
  closePopup(popupAddCards);

  const submitButton = popupAddCards.querySelector('.popup__submit-button'); //evt.submitter
  submitButton.disabled = 'disabled';
}

//---слушатели---//
//на кнопке открытия попапа профиля // openEditFormButton
editProfileButton.addEventListener("click", function () {
  editProfileValidator.disableSubmitButton();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
});

// на кнопке закрытия попапа профиля
closeProfileButton.addEventListener("click", function () {
  closePopup(popupEditProfile);
});

//в создании карточки
addCardButton.addEventListener("click", function () {
  addCardValidator.resetErrors();
  addCardValidator.toggleButtonState();
  openPopup(popupAddCards)
});

//закрытие карточки
closeAddCardButton.addEventListener("click", function () {
  closePopup(popupAddCards)
});

//закрыть третий попап
closeImageButton.addEventListener("click", function () {
  closePopup(popupOpenImage);
});

//на форме редактирования профиля
formProfile.addEventListener("submit", handleProfileFormSubmit);
//на форме добавления карточки
formAddCard.addEventListener("submit", handleAddCardFormSubmit);

//слушатели на клике по overlay для всех попапов
popupEditProfile.addEventListener('click', closePopupOverlay);
popupAddCards.addEventListener('click', closePopupOverlay);
popupOpenImage.addEventListener('click', closePopupOverlay);


/*
const container = document.querySelector('.element'); //карточки template */


