import React, { FC, useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { UserContext } from '../context';
import Gateway from '../gateway';
import { PopupMsg } from './PopupMsg';

interface FavoriteButtonProps {
  filmId: string;
}

export const FavoriteButton: FC<FavoriteButtonProps> = ({ filmId }) => {
  const {user, setUser} = useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [messagePopup, setMessagePopup] = useState('');
  const gateway = Gateway();

  useEffect(() => {
    if (!user.login) {
      setIsFavorite(false);
      return;
    }
    setIsFavorite(user.favorites.includes(filmId));
  }, [user]);

  const activatePopup = (message: string) => {
    setIsOpenPopup(true);
    setMessagePopup(message);
  };
  
  const onClickHandler = async () => {
    if (!user.login) {
      activatePopup('Only authorized users can set favorites!');
      return;
    }
    let favorites = [...user.favorites];
    const elem = favorites.indexOf(filmId);
    if (elem >= 0) {
      favorites.splice(elem, 1)
    } else{
      favorites.push(filmId)
    }
    const response = await gateway.setFavorites(user.login, favorites);
    if (response && response.status === 201) {
      user.favorites = favorites;
      setUser({...user});
    } else {
      activatePopup('Some error occured');
    }
  };
  
  return (
    <>
      <Button isFavorite={isFavorite} 
              onClick={onClickHandler} />
      <PopupMsg isOpen={isOpenPopup} 
                closeModal={setIsOpenPopup} 
                message={messagePopup} />
    </>
  )
}

const Button = styled.div`
  background-image: ${props => props.isFavorite === true ? "url(./images/heart-full.svg)" : "url(./images/heart-empty.svg)"}; 
  height: 38px;
  width: 38px;
  cursor: pointer;
  position: absolute;
  top: 25px;
  right: 17px;
`;