import React, { FC } from 'react';
import styled from 'styled-components';
import { Comment as CommentType } from '../types';
import date from 'date-and-time';

interface CommentProps {
  comment: CommentType;
}

export const Comment: FC<CommentProps> = ({ comment }) => {
  const { text, ownerName, date: reliseDate } = comment;
  const createData = date.format(new Date(reliseDate), 'YYYY/MM/DD HH:mm');
  
  return (
    <Wrapper>
      <Header>
        <h3>{ownerName}</h3>
        <CreateData>
          {createData}
        </CreateData>
      </Header>
      <TextBox>
        {text}
      </TextBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 10px 0px;
  background-color: #fcba47;
  border-radius: 12px;
  position: relative;
`;

const Header = styled.div`
  width: 680px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;

const CreateData = styled.p`
  font-size: 14px;
  font-style: italic;
`;

const TextBox = styled.p`
  font-size: 16px;
  margin: 10px 15px;
`;