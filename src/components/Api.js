class Api {
    constructor({ baseUrl, headers }) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }
    //1. Загрузка информации о пользователе с сервера (get)
    getProfile() {
        console.log('getProfile')
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
            .catch(console.log)
    }
    //2. Загрузка карточек с сервера (get)
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
    }

    //3. редактирование профиля (PATCH)

    editProfile(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data['name'],
                about: data['info']
            })
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
    }

    //4.Добавление новой карточки (POST)
   addCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
    }
    //Удаление каротчки (DELETE)

    //Установка лайка (PUT)

    //Удаление лайка (DELETE)

    //Обновление автатара (PATCH)


}

    export const api = new Api({
        baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
        headers: {
            authorization: '4bc9205a-f1dc-46cf-b912-dd97da2cb44d',
            'Content-Type': 'application/json'
        }
    });


/*
// Выход: Создай дополнительный метод в Api, который будет вызывать два запроса и дожидаться ответа от них:
//   getAppInfo() {
//     return Promise.all([this.getCardList(), this.getUserInfo()]);
//   }

// и потом работай с ними при загрузке страницы:
// api.getAppInfo()
//   .then(([ cardsArray, userData ]) => {
//     userId = userData._id;

//     userInfo.setUserInfo({
//       userName: userData.name,
//       userDescription: userData.about,
//       userAvatar: userData.avatar
//     });

//     cardList.renderItems(cardsArray);
//   }) */