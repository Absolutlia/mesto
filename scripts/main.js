
//popups
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCards = document.querySelector(".popup_add-cards");
const popupOpenImage = document.querySelector(".popup_open-image");

//кнопки открытия попапов
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

//кнопки закрытия попапов
const closeProfileButton = popupEditProfile.querySelector(
  ".popup__close-button_profile"
);
const closeAddCardButton = popupAddCards.querySelector(
  ".popup__close-button_card"
);
const closeImageButton = popupOpenImage.querySelector(".popup__close-button_image");

//profile
const profile = document.querySelector(".profile");
const formProfile = popupEditProfile.querySelector(".popup__form_profile");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const nameInput = popupEditProfile.querySelector(".popup__input_type_name");
const jobInput = popupEditProfile.querySelector(".popup__input_type_info");

//форма для новой карточки
const formAddCard = document.querySelector(".popup__add-cards");
const inputCardName = popupAddCards.querySelector(".popup__input_card_name");
const inputCardLink = popupAddCards.querySelector(".popup__input_card_url");

//template
const elementList = document.querySelector(".elements__list"); //изначальный список карточек ul
const cardTemplate = document.querySelector('.card-template').content;

//popup с увеличивающейся картинкой
const bigImage = popupOpenImage.querySelector(".popup__big-image"); //img
const bigImageTitle = popupOpenImage.querySelector(".popup__image-title");


//закрытие по esc
const closePopupEsc = (evt) => {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

// закрытие по клику на оверлей
function closePopupOverlay (evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
};

//функции открытия и закрытия попапов
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keyup', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keyup', closePopupEsc);
 };


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function likeCard(evt) {
  const like = evt.currentTarget;
  like.classList.toggle('element__button-like_active');
};

function deleteCard(evt) {
  evt.currentTarget.closest(".element").remove(); //delete
}

//функция создания карточки
function createCard(data) {
  const card = cardTemplate.querySelector('.element').cloneNode(true); //клонируем элемент
  const cardImage = card.querySelector(".element__image");
  const cardName = card.querySelector(".element__title");
  const likeButton = card.querySelector(".element__button-like");
  const trashButton = card.querySelector(".element__trashbin");

  cardName.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  
  //слушатели
  likeButton.addEventListener("click", likeCard);
  trashButton.addEventListener("click", deleteCard);
  cardImage.addEventListener("click", viewImage);

  //возвращаем карточку
  return card;
}

//функция добавления новой карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard({ name: inputCardName.value, link: inputCardLink.value });
  closePopup(popupAddCards);
  inputCardName.value = '';
  inputCardLink.value = '';
  const submitButton = popupAddCards.querySelector('.popup__submit-button');
  submitButton.disabled = 'disabled';
}

//отрисовываем карточку
function renderCard(data) {
  const cardElement = createCard(data);
  elementList.prepend(cardElement);
}
function renderInitialCards() {
  initialCards.forEach(renderCard);
}

//функция открытия изображения
function viewImage(evt) {
  bigImage.src = evt.target.src;
  bigImage.alt = evt.target.alt;
  bigImageTitle.textContent = evt.target.alt;
  openPopup(popupOpenImage);
}

renderInitialCards();

//---слушатели---//
//на кнопке открытия попапа профиля
editProfileButton.addEventListener("click", function() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
});

// на кнопке закрытия попапа профиля
closeProfileButton.addEventListener("click", function () {
  closePopup(popupEditProfile);
});

//в создании карточки
addCardButton.addEventListener("click", function() {
  openPopup(popupAddCards)
});

//закрытие карточки
closeAddCardButton.addEventListener("click", function() {
  closePopup(popupAddCards)
});

//закрыть третий попап
closeImageButton.addEventListener("click", function() {
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