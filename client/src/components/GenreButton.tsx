import React, { FC } from 'react';
import styled from 'styled-components';

interface GenreButtonProps {
  value: string;
  clickHandler: Function;
  id: string;
  isActive: boolean;
}

export const GenreButton: FC<GenreButtonProps> = ({ value, clickHandler, id, isActive }) => {

  const onClickHandler = () => {
    clickHandler(id);
  };
  
  return (
    <Button type='button' value={value} onClick={onClickHandler} isActive={isActive} />
  )
}

const Button = styled.input`
  background: ${props => props.isActive 
                          ? "linear-gradient(#dedede, #f55353)" 
                          : "linear-gradient(#dedede, #ffbb75)"};
  border: 3px solid #fc8000;
  border-radius: 5px;
  height: 40px;
  width: 250px;
  outline: none;
  font-size: 18px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 5px;
`;