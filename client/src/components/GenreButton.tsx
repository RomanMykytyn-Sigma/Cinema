import React, { FC } from 'react';
import styled from 'styled-components';

interface GenreButtonProps {
  value: string;
  favorites?: boolean;
}

export const GenreButton: FC<GenreButtonProps> = ({ value, favorites }) => {
  
  return (
    <>
      {favorites
        ? <Button type='button' value={value} favorites />
        : <Button type='button' value={value} />
      }
    </>
  )
}

const Button = styled.input`
  background-color: ${props => props.favorites ? "#97debb" : "#f7dfc6"}; 
  border: 2px solid #fc8000;
  border-radius: 5px;
  height: 40px;
  width: 250px;
  outline: none;
  font-size: 18px;
  cursor: pointer;
  font-weight: bold;
`;