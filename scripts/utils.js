//popup с увеличивающейся картинкой
export const popupOpenImage = document.querySelector(".popup_open-image");
export const bigImage = popupOpenImage.querySelector(".popup__big-image");
export const bigImageTitle = popupOpenImage.querySelector(".popup__image-title");

//закрытие по esc
export const closePopupEsc = (evt) => {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

// закрытие по клику на оверлей
export const closePopupOverlay = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
};

//функции открытия и закрытия попапов
export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener('keyup', closePopupEsc);
};

export const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keyup', closePopupEsc);
};



