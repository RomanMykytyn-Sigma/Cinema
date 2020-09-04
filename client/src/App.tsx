import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Header } from './components/Header';
import { FilmCard } from './components/FilmCard';
import { GenreButton } from './components/GenreButton';
import Gateway from './gateway';
import styled from 'styled-components';
import { UserContext } from './context'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import YouTube from 'react-youtube';

const App: React = () => {
  const [user, setUser] = useState({});
  const [activeFilm, setActiveFilm] = useState({});
  const [listGenres, setListGenres] = useState([]);
  const [listFilms, setListFilms] = useState([]);
  const [genreFilter, setGenreFilter] = useState([]);
  const gateway = Gateway();

  useEffect(() => {
    const fetchApi = async () => {
      const data = await gateway.getData(); 
      setListGenres(data.listGenres);
      setListFilms(data.listFilms);
      setUser(data.user);
    }
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      if (genreFilter.includes('My favorites')) {
        const films = await gateway.getFilmsByFavorites(user.favorites); 
        setListFilms(films);
      } else {
        const films = await gateway.getFilmsByGenres(genreFilter); 
        setListFilms(films);
      }
    }
    fetchApi();
  }, [genreFilter]);

  const changeFilterValue = (genreId) => {
    if (genreFilter.includes(genreId)) {
      setGenreFilter(genreFilter.filter(el => el !== genreId));
    } else if (genreFilter.includes('My favorites')) {
      setGenreFilter([genreId]);
    } else {
      setGenreFilter([...genreFilter, genreId]);
    }
  };

  const clickFavotitesHandler = (genreId) => {
    if (genreFilter.includes('My favorites')) {
      setGenreFilter([]);
    } else {
      setGenreFilter([genreId]);
    }
  };

  return (
    <Router>
      <UserContext.Provider value={{user, setUser}}>
        <Header />
        <FlexWrapper>
          <Aside>
            { user.login &&
              <GenreButton value={'My favorites'}
                           id={'My favorites'}
                           clickHandler={clickFavotitesHandler}
                           isActive={genreFilter.includes('My favorites')} />
            }
            { listGenres.map(el => 
                <GenreButton key={el._id} 
                             value={el.name} 
                             id={el._id}
                             clickHandler={changeFilterValue}
                             isActive={genreFilter.includes(el._id)} />
              )
            }
          </Aside>
          <MainField>
            <Switch>
              <Route path='/' exact>
                { listFilms.map(el => 
                    <FilmCard key={el._id} film={el} setActiveFilm={setActiveFilm} />
                  )
                }
              </Route>
              <Route path='/watch' exact>
                <YouTube videoId={activeFilm.videoSource} opts={{height: '480', width: '720'}} onReady={this._onReady} />;
              </Route>
            </Switch>
          </MainField>
        </FlexWrapper>
      </UserContext.Provider>
    </Router>
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