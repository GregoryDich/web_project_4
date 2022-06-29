export default class UserInfo {
  constructor({ name, info, avatar }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(info);
    this._avatar = document.querySelector(avatar);
  }
  setUserAvatar(data) {
    this._avatar.src = data;
  }
  getUserInfo() {
    this._data = {
      name: this._name.textContent,
      about: this._about.textContent,
    };
    return this._data;
  }
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  }
}
