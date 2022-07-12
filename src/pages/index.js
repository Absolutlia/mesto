import '../pages/index.css';
import { Card } from '../components/Card';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';
import { UserInfo } from '../components/UserInfo.js';
import {
  validationConfig, editProfileButton, addCardButton, nameInput, jobInput, formProfile,
  formAddCard, formAvatar, profileOpenAvatarButton
} from '../utils/constants.js';
import { Api } from '../components/Api.js'

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
  headers: {
      authorization: '4bc9205a-f1dc-46cf-b912-dd97da2cb44d',
      'Content-Type': 'application/json'
  }
});

export const imagePopup = new PopupWithImage('.popup_open-image');

//получаем данные с сервера

let userId = null;

api.getProfile()
  .then(res => {
    userInfo.setUserInfo(res.name, res.about, res.avatar);
    userId = res._id; //перезапись id
  })

api.getInitialCards()
  .then(cardList => {
    cardList.reverse();
    cardList.forEach(data => {
      const card = createCard(data.name, data.link, data.likes, data._id, userId, data.owner._id)
      section.addItem(card)
    })
  })

// ----PROFILE: информация о юзере ----
const userInfo = new UserInfo({
  profileNameSelector: '.profile__title',
  profileJobSelector: '.profile__subtitle',
  avatarSelector: ".profile__avatar"
});

//форма редактирования профиля

const editProfilePopup = new PopupWithForm('#edit_profile', {
  handleSubmit: (data) => {
    editProfilePopup.isLoading(true, 'Создать', 'Создание...')
    const { name, about, avatar} = data; //name, info
    api.editProfile(data['name'], data['info']) //name, info
      .then((res) => {
        userInfo.setUserInfo(res.name, res.about, res.avatar); //инпуты сохр
        editProfilePopup.close();
      })
      .catch(err => console.log(`error: ${err}`))
      .finally(() => {
        editProfilePopup.isLoading(false, 'Создать', 'Создание...')
      })
  }
});

//Форма изменения аватара

const avatarPopup = new PopupWithForm('.popup_avatar', {
  handleSubmit: (item) => {
    avatarPopup.isLoading(true, 'Создать', 'Создание...')
    api.changeAvatar(item.avatar)
      .then((res) => {
        userInfo.setUserInfo({ avatar: res.avatar });
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        avatarPopup.isLoading(false, 'Создать', 'Создание...')
      });
  }

})

// Экземпляр формы для удаления карточки
const confirmPopup = new PopupWithConfirmation('.popup_delete-card');

function handleCardClick(cardName, cardLink) { //ф-я вызывается при клике на картинку
  imagePopup.open(cardName, cardLink);
}

//Функция создания карточки
function createCard(cardName, cardLink, likes, cardId, userId, ownerId) {
  const listItem = new Card(cardName, cardLink, likes, cardId, userId, ownerId, '.card-template', handleCardClick,

    //handleDeleteClick
    (cardId) => {
      confirmPopup.open();
      confirmPopup.setSubmitAction(() => {
        api.deleteCard(cardId)
          .then(res => {
            listItem.handleDeleteCard();
            confirmPopup.close();
          })
          .catch((err) => {
            console.log(err);
          })
      })
    },

    //handleLikeCLick
    (cardId) => {
      if (listItem.isLiked()) {
        api.deleteLike(cardId)
          .then(res => {
            listItem.setLikes(res.likes)
          })
          .catch((err) => {
            console.log(err);
          })

      } else {
        api.addLike(cardId)
          .then(res => {
            listItem.setLikes(res.likes)
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  );
  const card = listItem.generateCard();
  return card;
}

// создаем экземпляр класса Section для отрисовки всех карточек + добавление новой
const section = new Section({
  items: [],
  renderer: (item) => {
    const cardItem = createCard(item.name, item.link, item.likes, item.cardId, userId, item.ownerId, '.element', handleCardClick)
    section.addItem(cardItem);
  }
}, '.elements__list');
section.renderItems();

//форма добавления карточек
const addCardPopup = new PopupWithForm('.popup_add-cards', {
  handleSubmit: (data) => {
    addCardPopup.isLoading(true, 'Создать', 'Создание...')
    api.addCard(data['image-name'], data['image-link'])
      .then((res) => {
        const card = createCard(res.name, res.link, res.likes, res._id, userId, res.owner._id);
        section.addItem(card);
        addCardPopup.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        addCardPopup.isLoading(false, 'Создать', 'Создание...')
      })
  }
})

//---слушатели---//
editProfileButton.addEventListener("click", function () {
  editProfilePopup.open();
  editProfileValidator.resetValidation();
  const item = userInfo.getUserInfo();
  nameInput.value = item.name;
  jobInput.value = item.about;
});

addCardButton.addEventListener("click", function () {
  addCardValidator.resetValidation();
  addCardPopup.open();
});

profileOpenAvatarButton.addEventListener('click', () => {
  avatarPopup.open();
  editAvatarValidator.resetValidation();
})

//подписки на закрытие попапов
imagePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
confirmPopup.setEventListeners();
avatarPopup.setEventListeners();

// Валидация форм
const editProfileValidator = new FormValidator(validationConfig, formProfile);
const addCardValidator = new FormValidator(validationConfig, formAddCard);
const editAvatarValidator = new FormValidator(validationConfig, formAvatar);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();
editAvatarValidator.enableValidation();