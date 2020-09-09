import { API_PATH } from './constants';
import { Comment } from './types'

export default function Gateway() {

  function toJson(response){
    if (!response.ok) {
      throw new Error('Network error.');
    }
    return response.json();
  }
  
  function setFavorites(userName: string, favorites: Array<string>) {
    return fetch(API_PATH.SET_FAVORITES, {method: 'POST',
                                          headers: {'Content-Type': 'application/json'},
                                          body: JSON.stringify({userName, favorites})
    })
    .catch(err => alert(err));
  }

  function createOrLoginUser(value: string, login: string, password: string) {
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

  function getData() {
    return fetch(API_PATH.GET_DATA).then(toJson).catch(err => alert(err));
  }

  function addVote(login: string, filmId: string, voteValue: number) {
    return fetch(API_PATH.ADD_VOTE, {method: 'POST',
                                     headers: {'Content-Type': 'application/json'},
                                     body: JSON.stringify({login, filmId, voteValue})
    })
    .then(toJson).catch(err => alert(err));
  }

  function getFilmsByGenres(genres: string[]) {
    return fetch(API_PATH.FILM_BY_GENRES, {method: 'POST',
                                           headers: {'Content-Type': 'application/json'},
                                           body: JSON.stringify(genres)
    })
    .then(toJson).catch(err => alert(err));
  }

  function getFilmsByFavorites(favorites: string[]) {
    return fetch(API_PATH.FILM_BY_FAVORITES, {method: 'POST',
                                              headers: {'Content-Type': 'application/json'},
                                              body: JSON.stringify(favorites)
    })
    .then(toJson).catch(err => alert(err));
  }

  function addComment(comment: Comment) {
    return fetch(API_PATH.ADD_COMMENT, {method: 'POST',
                                        headers: {'Content-Type': 'application/json'},
                                        body: JSON.stringify(comment)
    })
    .then(toJson).catch(err => alert(err));
  }

  function getCommentsByFilm(filmId: string) {
    return fetch(API_PATH.GET_COMMENTS_BY_FILM, {method: 'POST',
                                                 headers: {'Content-Type': 'application/json'},
                                                 body: JSON.stringify({filmId})
    })
    .then(toJson).catch(err => alert(err));
  }
  
  return  Object.freeze({
    setFavorites,
    createOrLoginUser,
    userLogout,
    getData,
    addVote,
    getFilmsByGenres,
    getFilmsByFavorites,
    addComment,
    getCommentsByFilm,
  });
}