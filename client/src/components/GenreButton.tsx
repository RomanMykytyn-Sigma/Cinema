import React, { FC } from 'react';
import styled from 'styled-components';

interface GenreButtonProps {
  value: string;
}

export const GenreButton: FC<GenreButtonProps> = ({ value }) => {
  
  return (
    <Button type='button' value={value} />
  )
}

const Button = styled.input`
  background-color: #f7dfc6;
  border: 2px solid #fc8000;
  border-radius: 5px;
  height: 40px;
  width: 250px;
  outline: none;
  font-size: 18px;
  cursor: pointer;
  font-weight: bold;
`;