import '../pages/index.css';
import { Card } from '../components/Card';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import {
  initialCards,
  validationConfig, editProfileButton, addCardButton, nameInput, jobInput, formProfile, formAddCard
} from '../utils/constants.js'

export const imagePopup = new PopupWithImage('.popup_open-image');

const editProfileValidator = new FormValidator(validationConfig, formProfile);
const addCardValidator = new FormValidator(validationConfig, formAddCard);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

function handleCardClick(cardName, cardLink) { //ф-я вызывается при клике на картинку
  imagePopup.open(cardName, cardLink);
}

function createCard(cardName, cardLink) { //renderCard
  const listItem = new Card(cardName, cardLink, '.card-template', handleCardClick);
  return listItem.generateCard();
}

const cardList = new Section({ // создаем экземпляр класса Section для отрисовки всех карточек + добавление новой
  items: initialCards,
  renderer: (item) => {
    const cardItem = createCard(item.name, item.link, '.element', handleCardClick) //cardName, cardLink, cardSelector, handleCardClick
    cardList.addItem(cardItem);
  }
}, '.elements__list');

cardList.renderItems();

const addCardPopup = new PopupWithForm('.popup_add-cards', {
  handleSubmit: (data) => {
    const cardName = data['image-name'];
    const cardLink = data['image-link'];
    const card = createCard(cardName, cardLink); // 
    cardList.addItem(card); // добавляем карточку методом addItem класса Section
    addCardPopup.close();
  }
})

const userInfo = new UserInfo({
  profileNameSelector: '.profile__title',
  profileJobSelector: '.profile__subtitle'
});

const editProfilePopup = new PopupWithForm('#edit_profile', {
  handleSubmit: (data) => {
    const { name, info } = data;
    userInfo.setUserInfo(name, info);
    editProfilePopup.close();
  }
});

//подписки на закрытие
imagePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();

//---слушатели---//
editProfileButton.addEventListener("click", function () {
  editProfilePopup.open();
  editProfileValidator.resetValidation();
  const { name, job } = userInfo.getUserInfo();

  nameInput.value = name;
  jobInput.value = job;
});

addCardButton.addEventListener("click", function () {
  addCardValidator.resetValidation();
  addCardPopup.open();
});
