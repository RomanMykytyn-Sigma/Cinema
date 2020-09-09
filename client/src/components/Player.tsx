import React, { FC } from 'react';
import YouTube from 'react-youtube';
import { useParams } from "react-router-dom";

interface PlayerProps {
  
}

export const Player: FC<PlayerProps> = ({ }) => {
  const {videoSource} = useParams();
  
  return (
    <>
      <YouTube videoId={videoSource} opts={{height: '480', width: '720'}} />
    </>
  )
}
