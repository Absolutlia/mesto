
const popups = document.querySelectorAll('.popup');

const closePopupEsc = (evt) => {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

//функции открытия и закрытия попапов
export function openPopup(popups) {
  popups.classList.add("popup_opened");
  document.addEventListener('keyup', closePopupEsc);
};

export function closePopup(popups) {
  popups.classList.remove("popup_opened");
  document.removeEventListener('keyup', closePopupEsc);
};

//объединяем обработчики крестиков и overlay
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  });
});
