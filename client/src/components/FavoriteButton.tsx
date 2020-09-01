import React, { FC } from 'react';
import styled from 'styled-components';

interface FavoriteButtonProps {
  isFavorite: boolean;
  id: string;
  setFavorite: Function;
}

export const FavoriteButton: FC<FavoriteButtonProps> = ({ isFavorite, id, setFavorite }) => {
  
  const onClickHandler = () => {
    console.log('xxx');
    
    setFavorite(id);
  };
  
  return (
    <Button isFavorite={isFavorite} 
            onClick={onClickHandler} />
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