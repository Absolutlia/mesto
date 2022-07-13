export class UserInfo {
    constructor({ profileNameSelector, profileJobSelector, avatarSelector }) {
        this._nameElement = document.querySelector(profileNameSelector);
        this._jobElement = document.querySelector(profileJobSelector);
        this._itemAvatar = document.querySelector(avatarSelector);
    }

    //забрать данные пользователя
    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            about: this._jobElement.textContent,
            avatar: this._itemAvatar.src
        }
    }

    //сохранить новые данные пользователя, изменения аватара и профиля пользователя в одной функции
    setUserInfo(item) {
        this._nameElement.textContent = item.name;
        this._jobElement.textContent = item.about;
        this._itemAvatar.src  = item.avatar; 
    }


}