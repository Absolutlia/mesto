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
           // avatar: this._itemAvatar.src
        }
    }

    //сохранить новые данные пользователя
    setUserInfo(name, about, avatar) {
        this._nameElement.textContent = name;
        this._jobElement.textContent = about;
        this._itemAvatar.src = avatar
    }

    //сохранить аватар
    // setAvatarInfo(profileNewAvatar) {
    //     this._avatar.src  = profileNewAvatar;
    // }
}