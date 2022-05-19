const listOfElements = {
    formSelector: '.popup__form', // form
    inputSelector: '.popup__input', //form__input
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input-type-error', //form__input_type_error
    errorClass: 'popup__input-error' //span аналог form__input-error
};

//Ф-я, кот добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage; //заменим содержимое span с ошибкой на переданный параметр
    errorElement.classList.add(obj.errorClass); //показываем сообщение об ошибке
};

//ф-я удаления класса с ошибкой
const hideInputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.classList.remove(obj.errorClass);

};

const isValid = (formElement, inputElement, obj) => {
    if (!inputElement.validity.valid) {
        //передадим сообще об ошибке
        showInputError (formElement, inputElement, inputElement.validationMessage, obj);
    } else {
        hideInputError (formElement, inputElement, obj)
    };
};


const hasInvalidInput = (inputList) => {
    return inputList.some ((inputElement) => {
        return !inputElement.validity.valid;
    });
};

//кнопка сабмита
const disableButton = (button) => {
    button.classList.add('popup__submit-button_inactive');
    button.disabled = 'disabled';
}


const toggleButtonState = (inputList, buttonElement, obj) => {
// Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement); // сделай кнопку неактивной
       } else {
// иначе сделай кнопку активной
        buttonElement.classList.remove('popup__submit-button_inactive');
        buttonElement.disabled = '';
}
};


//слушатели
const setEventListeners = (formElement, obj) => {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector)); //все инпуты
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, obj);

// Обойдём все элементы полученной коллекции
    inputList.forEach(function (inputElement) {
// каждому полю добавим обработчик события input
        inputElement.addEventListener('input', function () {
// Внутри колбэка вызовем isValid,// передав ей форму и проверяемый элемент
            isValid(formElement, inputElement, obj);
// Вызовем toggleButtonState и передадим ей массив полей и кнопку
            toggleButtonState(inputList, buttonElement, obj);
        });
    });
};

const enableValidation = (obj) => {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
// Переберём полученную коллекцию
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
// У каждой формы отменим стандартное поведение
            evt.preventDefault();
        });
// Для каждой формы вызовем функцию setEventListeners,// передав ей элемент формы
        setEventListeners(formElement, obj);
    });
};

enableValidation(listOfElements);












