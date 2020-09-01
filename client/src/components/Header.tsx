import React, { useState, FC } from 'react';
import styled from 'styled-components';

interface HeaderProps {
  userName: string;
  setUserName: Function;
  setListFavorites: Function;
}

export const Header: FC<HeaderProps> = ({ userName, setUserName, setListFavorites }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const onChangeHandler = (e) => {
    if (e.target.type === 'text') {
        setLogin(e.target.value);
    } else if (e.target.type === 'password') {
        setPassword(e.target.value);
    }
  };

  const logInNewHandler = (e) => {
    if (!login || !password) {
      alert('Login or(and) password is empty!\nPlease, enter theirs.');
      return;
    }
    const url = e.target.value === 'Log In' ? '/users/login' : '/users/create';
    const alertMsg = e.target.value === 'Log In' ? 'Wrong login or(and) password!' 
                                                 : 'This login already exist!!!\nPlease, try another login.';
    fetch(url, {method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({login, password})
    })
      .then((response) => {
        if (response.status !== 201) {
          alert(alertMsg);
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setUserName(data.user.login);
          setListFavorites(data.user.favorites);
        }         
      })
  }

  const exitHandler = () => {
    fetch('/users/exit', {redirect: "follow"})
      .then((response) => {
        console.log(response);
        
        if (response.status === 200) {
         setUserName('');
        }
      })
  }

  return (
    <Wrapper>
      <p>
        { userName 
            ? `Welcome, ${userName}!`
            : 'Hi, stranger. Please, join us.'
        }
      </p>
      { !userName
          ? <div>     
              <Input type='text' onChange={onChangeHandler} placeholder='Login' />
              <Input type='password' onChange={onChangeHandler} placeholder='Password' />
              <Button type='button' value='Log In' onClick={logInNewHandler} />
              <Button type='button' value='New User' onClick={logInNewHandler} />
            </div>
          : <div>
              <Button type='button' value='Exit' onClick={exitHandler} />
            </div>
      } 
    </Wrapper>
  )
}

const Wrapper = styled.header`
  height: 60px;
  background-color: #242322;
  display: flex;
  justify-content: space-between;
  align-items: center; 
  color: #f7dfc6;
  font-size: 28px;
  font-weight: bold;
  padding-left: 15px;
`;

const Input = styled.input`
  background-color: #f7dfc6;
  border: 2px solid #fc8000;
  border-radius: 15px;
  height: 30px;
  margin-right: 15px;
  outline: none;
  font-size: 18px;
`;

const Button = styled(Input)`
  background-color: #fc8000;
  border: 2px solid #f7dfc6;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;