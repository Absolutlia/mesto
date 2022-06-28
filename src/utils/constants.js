export const editProfileButton = document.querySelector(".profile__edit-button");
export const addCardButton = document.querySelector(".profile__add-button");
export const popupEditProfile = document.querySelector('.popup_edit-profile');
export const formProfile = popupEditProfile.querySelector(".popup__form_profile");
export const formAddCard = document.querySelector(".popup__add-cards");
//template
export const elementList = document.querySelector(".elements__list"); //изначальный список карточек ul
export const cardSelector = document.querySelector('.card-template');
export const nameInput = popupEditProfile.querySelector(".popup__input_type_name");
export const jobInput = popupEditProfile.querySelector(".popup__input_type_info");

//popups

export const popupAddCards = document.querySelector(".popup_add-cards");

//popup с увеличивающейся картинкой
export const popupOpenImage = document.querySelector(".popup_open-image");
export const bigImage = popupOpenImage.querySelector(".popup__big-image");
export const bigImageTitle = popupOpenImage.querySelector(".popup__image-title");
export const profile = document.querySelector(".profile");

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input-type-error',
  errorClass: 'popup__input-error'
};
const arkhyz = new URL('../images/arkhyz.jpg', import.meta.url);
const chelyabinskOblast = new URL('../images/chelyabinsk-oblast.jpg', import.meta.url);
const ivanovo = new URL('../images/ivanovo.jpg', import.meta.url);
const kamchatka = new URL('../images/kamchatka.jpg', import.meta.url);
const kholmogorskyRayon = new URL('../images/kholmogorsky-rayon.jpg', import.meta.url);
const baikal = new URL('../images/baikal.jpg', import.meta.url);

export const initialCards = [
  {
    name: "Архыз",
    link: arkhyz,
  },
  {
    name: "Челябинская область",
    link: chelyabinskOblast,
  },
  {
    name: "Иваново",
    link: ivanovo,
  },
  {
    name: "Камчатка",
    link: kamchatka,
  },
  {
    name: "Холмогорский район",
    link: kholmogorskyRayon,
  },
  {
    name: "Байкал",
    link: baikal,
  },
];