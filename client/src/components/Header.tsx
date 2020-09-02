import React, { useState, FC } from 'react';
import styled from 'styled-components';
import UserGateway from '../gateways/UsersGateway';

interface HeaderProps {
  userName: string;
  setUserName: Function;
  setListFavorites: Function;
}

export const Header: FC<HeaderProps> = ({ userName, setUserName, setListFavorites }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const userGateway = UserGateway();

  const onChangeHandler = (e) => {
    if (e.target.type === 'text') {
        setLogin(e.target.value);
    } else if (e.target.type === 'password') {
        setPassword(e.target.value);
    }
  };

  const logInNewHandler = async (e) => {
    if (!login || !password) {
      alert('Login or(and) password is empty!\nPlease, enter theirs.');
      return;
    }
    const alertMsg = e.target.value === 'Log In' ? 'Wrong login or(and) password!' 
                                                 : 'This login already exist!!!\nPlease, try another login.';
    const data = await userGateway.createOrLoginUser(e.target.value, login, password);
    if (!data.error) {
      setUserName(data.user.login);
      setListFavorites(data.user.favorites);
    } else{
      alert(alertMsg);
    }         
  }

  const logoutHandler = async () => {
    const response = await userGateway.userLogout();
    if (response && response.status === 200) {
      setUserName('');
    }   
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
              <Button type='button' value='LogOut' onClick={logoutHandler} />
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