import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup } from './utils.js';

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

//popup с увеличивающейся картинкой
export const popupOpenImage = document.querySelector(".popup_open-image");
export const bigImage = popupOpenImage.querySelector(".popup__big-image");
export const bigImageTitle = popupOpenImage.querySelector(".popup__image-title");
//кнопки открытия попапов
export const editProfileButton = document.querySelector(".profile__edit-button");
export const addCardButton = document.querySelector(".profile__add-button");

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
export const cardSelector = document.querySelector('.card-template');

//формы
export const formProfile = popupEditProfile.querySelector(".popup__form_profile");
export const formAddCard = document.querySelector(".popup__add-cards");

function handleCardClick(name, link) {
  bigImage.src = link;
  bigImage.alt = name;
  bigImageTitle.textContent = name;
  openPopup(popupOpenImage);

}

function renderCard(data) {
  const listItem = new Card(data, '.card-template', handleCardClick);
  const newCard = listItem.createCard();
  return newCard;
}

initialCards.forEach((data) => { // функция-итератор карточек
  elementList.prepend(renderCard(data)); // что-бы не дублировать код используем функцию createCard
});

const editProfileValidator = new FormValidator(validationConfig, formProfile);
const addCardValidator = new FormValidator(validationConfig, formAddCard);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
  editProfileValidator.resetValidation();
}

const handleAddCardFormSubmit = (evt) => {
  const newAddedCard = { name: inputCardName.value, link: inputCardLink.value };
  evt.preventDefault();
  elementList.prepend(renderCard(newAddedCard));
  evt.target.reset()
  closePopup(popupAddCards);
  addCardValidator.resetValidation();
}

//---слушатели---//
editProfileButton.addEventListener("click", function () {
  editProfileValidator.disableSubmitButton();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
});

addCardButton.addEventListener("click", function () {
  addCardValidator.disableSubmitButton();
  openPopup(popupAddCards)
});

//на форме редактирования профиля
formProfile.addEventListener("submit", handleProfileFormSubmit);
//на форме добавления карточки
formAddCard.addEventListener("submit", handleAddCardFormSubmit);
