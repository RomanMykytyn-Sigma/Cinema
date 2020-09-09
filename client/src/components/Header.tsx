import React, { useState, FC, useContext } from 'react';
import styled from 'styled-components';
import Gateway from '../gateway';
import { UserContext } from '../context';
import { PopupMsg } from './PopupMsg';

interface HeaderProps {
  
}

export const Header: FC<HeaderProps> = ({  }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [messagePopup, setMessagePopup] = useState('');
  const { user, setUser } = useContext(UserContext);
  const userGateway = Gateway();

  const onChangeHandler = (e) => {
    if (e.target.type === 'text') {
        setLogin(e.target.value);
    } else if (e.target.type === 'password') {
        setPassword(e.target.value);
    }
  };

  const activatePopup = (message: string) => {
    setIsOpenPopup(true);
    setMessagePopup(message);
  };

  const logInNewHandler = (e) => {
    if (!login || !password) {
      activatePopup('Login or(and) password is empty!\nPlease, enter theirs.');
      return;
    }
    const alertMsg = e.target.value === 'Log In' ? 'Wrong login or(and) password!' 
                                                 : 'This login already exist!!!\nPlease, try another login.';
   userGateway.createOrLoginUser(e.target.value, login, password)
      .then(data => setUser(data.user))
      .catch(() => activatePopup(alertMsg));
  }

  const logOutHandler = async () => {
    const response = await userGateway.userLogout();
    if (response && response.status === 200) {
      setUser({});
    }   
  }

  return (
    <Wrapper>
      <p>
        { user.login 
            ? `Welcome, ${user.login}!`
            : 'Hi, stranger. Please, join us.'
        }
      </p>
      { !user.login
          ? <div>     
              <Input type='text' onChange={onChangeHandler} placeholder='Login' />
              <Input type='password' onChange={onChangeHandler} placeholder='Password' />
              <Button type='button' value='Log In' onClick={logInNewHandler} />
              <Button type='button' value='New User' onClick={logInNewHandler} />
              <PopupMsg isOpen={isOpenPopup} closeModal={setIsOpenPopup} message={messagePopup} />
            </div>
          : <div>
              <Button type='button' value='LogOut' onClick={logOutHandler} />
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