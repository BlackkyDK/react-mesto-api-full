
class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
        if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(console.log(`Ошибка: ${res.status}`));
    }
  }

  _getHeaders() {
    const jwt = localStorage.getItem('jwt');
    return {
      'Authorization': `Bearer ${jwt}`,
      ...this._headers
    }
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
    //method: "GET",
    // credentials: 'include',
    headers: this._getHeaders()
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      //method: "GET",
      // credentials: 'include',
      headers: this._getHeaders()
    }).then(this._checkResponse);
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      // credentials: 'include',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      // credentials: 'include',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      // credentials: 'include',
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  changeLikeStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      // credentials: 'include',
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  changeAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      // credentials: 'include',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkResponse);
  }
}

const api = new Api(
  'http://api.klementeva.students.nomoredomains.sbs',
   {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
);

export default api;
