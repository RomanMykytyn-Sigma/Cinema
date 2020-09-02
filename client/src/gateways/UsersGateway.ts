import { API_PATH } from '../constants'

export default function UserGateway() {

  function toJson(response){
    return response.json();
  }
  
  function setFavorites(userName, favorites) {
    return fetch(API_PATH.SET_FAVORITES, {method: 'POST',
                                          headers: {'Content-Type': 'application/json'},
                                          body: JSON.stringify({userName, favorites})
    })
    .catch(err => alert(err));
  }

  function createOrLoginUser(value, login, password) {
    const url = value === 'Log In' ? API_PATH.USER_LOGIN : API_PATH.USER_CREATE;
    return fetch(url, {method: 'POST',
                       headers: {'Content-Type': 'application/json'},
                       body: JSON.stringify({login, password})
    })
    .then(toJson)
  }

  function userLogout() {
    return fetch(API_PATH.USER_LOGOUT).catch(err => alert(err));
  }
  
  return  Object.freeze({
    setFavorites,
    createOrLoginUser,
    userLogout,
  });
}