let popup = document.querySelector('.popup');
let popup_opened = document.querySelector('.popup_opened');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let addButton = document.querySelector('.profile__add-button');

let formElement = popup.querySelector('.popup__form');
const nameInput = popup.querySelector('.popup__input-name');
const jobInput = popup.querySelector('.popup__input-info');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

editButton.addEventListener('click', function() {
  document.querySelector('.popup').style.display = 'block';
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  popup.classList.add('popup_opened');
}
)

closeButton.addEventListener('click', function() {
  document.querySelector('.popup').style.display = 'none';
  popup.classList.remove('popup_opened');
}
)

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  document.querySelector('.popup').style.display = 'none';
}
formElement.addEventListener('submit', formSubmitHandler);

