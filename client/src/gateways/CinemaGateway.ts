import { API_PATH } from '../constants'

export default function CinemaGateway() {

  function toJson(response){
    if (!response.ok) {
      throw new Error('Network error.');
    }
    return response.json();
  }
  
  function getData() {
    return fetch(API_PATH.GET_DATA).then(toJson).catch(err => alert(err));
  }
  
  return  Object.freeze({
    getData,
  });
}