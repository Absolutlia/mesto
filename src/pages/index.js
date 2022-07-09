import '../pages/index.css';
import { Card } from '../components/Card';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';
import { UserInfo } from '../components/UserInfo.js';
import {
  initialCards,
  validationConfig, editProfileButton, addCardButton, nameInput, jobInput, formProfile, formAddCard
} from '../utils/constants.js';
import { api } from '../components/Api.js'

export const imagePopup = new PopupWithImage('.popup_open-image');

api.getProfile()
  .then(res => {
    console.log('ответ', res)
    userInfo.setUserInfo(res.name, res.about);
  })

// let userId = null;
// api.getAppInfo()
// .then((data) => {
//   userId = data._id;
// })
// .catch()

api.getInitialCards()
  .then(cardList => {
    console.log(cardList)
    cardList.forEach(data => {
      const card = createCard(data.name, data.link, data.likes)
      section.addItem(card)
    })
  })

//Promise.all([api.getProfile(), api.getInitialCards()])

const editProfileValidator = new FormValidator(validationConfig, formProfile);
const addCardValidator = new FormValidator(validationConfig, formAddCard);
editProfileValidator.enableValidation();
addCardValidator.enableValidation();

function handleCardClick(cardName, cardLink) { //ф-я вызывается при клике на картинку
  imagePopup.open(cardName, cardLink);
}

// function handleDeleteClick() {
//   console.log('clicked')
//   confirmPopup.open();
//  }

function createCard(cardName, cardLink, likes) { //renderCard
  const listItem = new Card(cardName, cardLink, likes, '.card-template', handleCardClick,
  () => {
    console.log('clicked button');
    confirmPopup.open()
  }
  );
  return listItem.generateCard();
}

const section = new Section({ // создаем экземпляр класса Section для отрисовки всех карточек + добавление новой
  items: [],
  renderer: (item) => {
    const cardItem = createCard(item.name, item.link, item.likes, '.element', handleCardClick)
    section.addItem(cardItem);
  }
}, '.elements__list');

section.renderItems();

const addCardPopup = new PopupWithForm('.popup_add-cards', {
  handleSubmit: (data) => {
    api.addCard(data['image-name'], data['image-link'])
      .then((res) => {
        const card = createCard(res.name, res.link, res.likes);
        section.addItem(card);
      })
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
    api.editProfile(data)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch(err => console.log(`error: ${err}`))
    editProfilePopup.close();
  }
});

const confirmPopup = new PopupWithConfirmation('.popup_delete-card', () => {
  console.log('delete')
});

//подписки на закрытие
imagePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
confirmPopup.setEventListeners();

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


