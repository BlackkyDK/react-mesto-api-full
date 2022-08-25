
class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
  } else {
      return Promise.reject(res.status)
  }
  }

  get _headers() {
    return {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    }
}

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
    //method: "GET",
    // credentials: 'include',
    headers: this._headers
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }).then(this._checkResponse);
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeLikeStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'http://api.klementeva.students.nomoredomains.sbs',
  // baseUrl: 'http://localhost:3000',
});

export default api;
