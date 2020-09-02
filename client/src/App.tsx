import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Header } from './components/Header';
import { FilmCard } from './components/FilmCard';
import { GenreButton } from './components/GenreButton';
import CinemaGateway from './gateways/CinemaGateway';
import UserGateway from './gateways/UsersGateway';
import styled from 'styled-components';

const App: React = () => {
  const [userName, setUserName] = useState('');
  const [listGenres, setListGenres] = useState([]);
  const [listFavorites, setListFavorites] = useState([]);
  const [listFilms, setListFilms] = useState([]);
  const cinemaGateway = CinemaGateway();
  const userGateway = UserGateway();

  useEffect(() => {
    const fetchApi = async () => {
      const data = await cinemaGateway.getData(); 
      setListGenres(data.listGenres);
      setListFilms(data.listFilms);
      if (data.user.login) {
        setUserName(data.user.login);
        setListFavorites(data.user.favorites);
    }}
    fetchApi();
  }, []);

  useEffect(() => {
    if (!userName) {
      setListFavorites([]);
    }
  }, [userName]);

  const checkIsFavorite = (filmId: string) => {
    if (listFavorites.includes(filmId)) {
      return true;
    } 
    return false;
  };

  const setFavorite = async (filmId: string) => {
    if (!userName) {
      alert('Only authorized users can set favorites! ');
      return;
    }
    let favorites = [...listFavorites];
    const elem = favorites.indexOf(filmId);
    if (elem >= 0) {
      favorites.splice(elem, 1)
    } else{
      favorites.push(filmId)
    }
    const response = await userGateway.setFavorites(userName, favorites);
    if (response && response.status === 201) {
      setListFavorites(favorites);
    } else {
      alert('Some error occured')
    }
  };

  return (
    <>
      <Header userName={userName} 
              setUserName={setUserName}
              setListFavorites={setListFavorites} />
      <FlexWrapper>
        <Aside>
          { userName &&
            <GenreButton value={'My favorites'} favorites />
          }
          { listGenres.map(el => 
              <GenreButton key={el._id} value={el.name}/>
            )
          }
        </Aside>
        <MainField>
          { listFilms.map(el => 
                <FilmCard key={el._id} film={el} isFavorite={checkIsFavorite(el._id)} setFavorite={setFavorite} />
            )
          }
        </MainField>
      </FlexWrapper>
    </>
  )
}

const Aside = styled.aside`
  width: 300px;
  height: 100%;
  background-color: #242322;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
`;

const MainField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 300px);
`;

const FlexWrapper = styled.div`
  display: flex;
`;

ReactDOM.render(<App />, document.getElementById('root'));