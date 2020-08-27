import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Header } from './components/Header';
import { GenreButton } from './components/GenreButton';
import styled from 'styled-components';

const App: React = () => {
  const [userName, setUserName] = useState('');
  const [listGenres, setListGenres] = useState([]);
  const [listFavorites, setListFavorites] = useState([]);

  useEffect(() => {
    fetch('/getData')
      .then((response) => {
        if (response.status === 200) {
         return response.json();
        }
      })
      .then((data) => {
        setListGenres(data.listGenres);
        if (data.user.login) {
          setUserName(data.user.login);
          setListFavorites(data.user.favorites)
        }
        
      })
  }, [])

  return (
    <>
      <Header userName={userName} 
              setUserName={setUserName}
              setListFavorites={setListFavorites} />
      <Aside>
        { userName &&
          <GenreButton value={'My favorites'} />
        }
        { listGenres.map(el => 
            <GenreButton key={el._id} value={el.name}/>
          )
        }
      </Aside>
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


ReactDOM.render(<App />, document.getElementById('root'));