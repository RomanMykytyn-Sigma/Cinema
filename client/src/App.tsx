import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Header } from './components/Header';
import { FilmCard } from './components/filmCard';
import { GenreButton } from './components/GenreButton';
import styled from 'styled-components';

const App: React = () => {
  const [userName, setUserName] = useState('');
  const [listGenres, setListGenres] = useState([]);
  const [listFavorites, setListFavorites] = useState([]);
  const [listFilms, setListFilms] = useState([]);

  useEffect(() => {
    fetch('/getData')
      .then((response) => {
        if (response.status === 200) {
         return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        
        setListGenres(data.listGenres);
        setListFilms(data.listFilms);
        if (data.user.login) {
          setUserName(data.user.login);
          setListFavorites(data.user.favorites);
        }
        
      })
  }, [])

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
                <FilmCard key={el._id} film={el}/>
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