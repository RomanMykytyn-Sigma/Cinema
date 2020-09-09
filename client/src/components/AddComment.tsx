import React, { FC, useState, useContext } from 'react';
import styled from 'styled-components';
import Gateway from '../gateway';
import { UserContext } from '../context';
import { Comment } from '../types';

interface AddCommentProps {
  filmId: string;
  listComments: Array<Comment>;
  setListComments: Function;
}

export const AddComment: FC<AddCommentProps> = ({ filmId, listComments, setListComments }) => {
  const [commentText, setCommentText] = useState('');
  const gateway = Gateway();
  const { user } = useContext(UserContext);
  
  const onChangeHandler = (e) => {
    setCommentText(e.target.value);
  };

  const onClickHandler = async () => {
    if (!commentText) {
      return
    }
    const data = await gateway.addComment({ text: commentText, 
                                            date: new Date(), 
                                            ownerName: user.login, 
                                            toFilm: filmId});
    if (data.error) {
    } else {
      const comments = [...listComments]
      comments.unshift(data.comment);
      setListComments(comments);
    }
    
  };

  
  return (
    <Wrapper>
      <TexrArea rows='3' onChange={onChangeHandler} />
      <Button type='button' value='Add' onClick={onClickHandler} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 720px;
  height: 120px;
  background: linear-gradient(#dedede, #fc7b03);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const TexrArea = styled.textarea`
  width: 650px;
  background-color: #dedede;
  border: 2px solid #fc7b03;
  border-radius: 8px;
`;

const Button = styled.input`
  width: 100px;
  height: 40px;
  background: linear-gradient(#fc7b03, #b05c04);
  border: 2px solid #f7dfc6;
  border-radius: 8px;
  color: white;
  font-size: 22px;
  font-weight: bold;
`;
