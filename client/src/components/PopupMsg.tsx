import React, { FC } from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';

interface PopupMsgProps {
  message: string;
  isOpen: boolean;
  closeModal: Function;
}

export const PopupMsg: FC<PopupMsgProps> = ({ message, isOpen, closeModal }) => {
  
  const closeHandler = () => {
    closeModal(false);
  };

  return (
    <StyledPopup open={isOpen} closeOnDocumentClick onClose={closeHandler}>
      <div className="modal">
        <Close onClick={closeHandler}>
            &times;
        </Close>
          {message}
      </div>
    </StyledPopup>
  );
}

const StyledPopup = styled(Popup)`
  // use your custom style for ".popup-overlay"
  &-overlay {
    background-color: rgba(64, 61, 82, 0.5);
  }
  // use your custom style for ".popup-content"
  &-content {
    font-size: 22px;
    background-color: #403d52;
    color: white;
    width: 400px;
    padding: 20px;
    border: 2px solid gray;
    border-radius: 15px;
  }
`;

const Close = styled.a`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 2px 5px;
  line-height: 20px;
  right: -10px;
  top: -10px;
  font-size: 28px;
  background: #ffffff;
  border-radius: 18px;
  border: 2px solid #403d52;
  color: black;
  font-weight: bold;
`;
