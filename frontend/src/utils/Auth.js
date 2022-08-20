export const BASE_URL = 'https://auth.nomoreparties.co';

function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  else {
    return Promise.reject(`Ошибка ${res.status}: ${res.statusText}`)
  }
}

//Параметры запроса для регистрации в нашем сервисе
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ "email": email, "password": password  })
  })
  .then((res) => checkResponse(res));
};

//Параметры запроса для авторизации в нашем сервисе
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
  .then((res) => checkResponse(res));
};

//Параметры запроса для проверки валидности токена и получения email для вставки в шапку сайта
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
  .then((res) => checkResponse(res));
};
