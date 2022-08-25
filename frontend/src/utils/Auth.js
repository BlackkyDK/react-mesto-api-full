export const BASE_URL = 'http://api.klementeva.students.nomoredomains.sbs';
// export const BASE_URL = 'http://localhost:3000';

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
    // credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email  })
  })
  .then(checkResponse);
};

//Параметры запроса для авторизации в нашем сервисе
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then((res) => checkResponse(res));
};

//Параметры запроса для проверки валидности токена и получения email для вставки в шапку сайта
export const getToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      // 'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((res) => checkResponse(res));
};
