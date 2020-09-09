import React, { FC, useContext, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../context';
import { Link } from "react-router-dom";
import { PopupMsg } from './PopupMsg';

interface PlayButtonProps {
  filmId: string;
  videoSource: string;
}

export const PlayButton: FC<PlayButtonProps> = ({ filmId, videoSource }) => {
  const { user } = useContext(UserContext);
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const onClickHandler = () => {
    if (!user.login) {
      setIsOpenPopup(true);
      return;
    }
    return;
  };
  
  return (
    <>
      {user.login
        ? <Link to={`/watch/${filmId}/${videoSource}`}>
            <Button value='Play' 
                    onClick={onClickHandler}
                    type='button' />
          </Link>
        : <Button value='Play' 
                  onClick={onClickHandler}
                  type='button' />
      }
      <PopupMsg isOpen={isOpenPopup} 
                closeModal={setIsOpenPopup} 
                message='Only Authorized users can watch film!' />
    </>
  )
}

const Button = styled.input`
  background-color: #fc8000;
  border: 2px solid #f7dfc6;
  font-size: 20px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  width: 100px;
  height: 30px;
`;