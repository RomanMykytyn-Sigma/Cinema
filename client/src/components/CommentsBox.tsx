import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { AddComment } from './AddComment';
import { Comment } from './Comment';
import Gateway from '../gateway';
import { useParams } from "react-router-dom";

interface CommentsBoxProps {

}

export const CommentsBox: FC<CommentsBoxProps> = ({  }) => {
  const [listComments, setListComments] = useState([]);
  const gateway = Gateway();
  const {filmId} = useParams();

  useEffect( () => {
    const fetchApi = async () => {
      const data = await gateway.getCommentsByFilm(filmId);
      if (data.error) {
        return
      }
      setListComments(data);
    };
    fetchApi();
  }, []);

  return (
    <Wrapper>
      <Header>
        <h2>
          Comments:
        </h2>
      </Header>
      <CommentsArea>
        {listComments.map(el => 
          <Comment comment={el} key={el._id} />
          )}
      </CommentsArea>
      <AddComment filmId={filmId}
                  setListComments={setListComments}
                  listComments={listComments} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 720px;
  margin-top: 25px;
`;

const Header = styled.div`
  background: linear-gradient(#dedede, #fc7b03);
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const CommentsArea = styled.div`
  width: 710px;
  min-height: 150px;
  background-color: #facfa2;
  padding: 5px;
`;