import React, { FC, useState, useContext } from 'react';
import styled from 'styled-components';
import StarRating from 'react-star-ratings'
import date from 'date-and-time';
import { FavoriteButton } from './FavoriteButton';
import { Film } from '../types';
import Gateway from '../gateway';
import { UserContext } from '../context';
import { Link } from "react-router-dom";

interface FilmCardProps {
  film: Film;
  setActiveFilm: Function;
}

export const FilmCard: FC<FilmCardProps> = ({ film, setActiveFilm }) => {
  const { name, coverImage, description, director, duration, genre, reliseDate, rating, _id  } = film;
  const [averageRating, setAverageRating] = useState(getAverageRating(rating));
  const { user } = useContext(UserContext);
  const relised = date.format(new Date(reliseDate), 'DD/MM/YYYY');
  const gateway = Gateway(); 
  
  function getAverageRating(listGrades: Array<number>) {
    return listGrades.reduce((a, b) => a + b, 0) / listGrades.length;
  }

  const changeRatingHandler = async (grade: number) => {
    if (!user.login) {
      alert('Only authorized users can vote!');
      return;
    }
    if (user.ratedFilms.includes(_id)) {
      alert("You've already voted for this movie!");
      return;
    }
    const response = await gateway.addVote(user.login, _id, grade);
    if (response.error) {
      alert(response.error);
      return;
    }
    rating.push(grade);
    user.ratedFilms.push(_id);
    setAverageRating(getAverageRating(rating));
  };

  const clickHandler = () => {
    setActiveFilm(film);
  };
  
  return (
    <Wrapper>

      <Chapter>
        {name}
        <StarRating starDimension='20px'
                    starSpacing='2px' 
                    rating={averageRating}
                    changeRating={changeRatingHandler}
                    starRatedColor='yellow'
                    starHoverColor='yellow' />
      </Chapter>
      
      <LeftSide>
        <Image width='175' 
               height='275' 
               src={coverImage} />
        <Link to='/watch'>
          <PlayButton type='button' 
                      value='Play'
                      onClick={clickHandler} />
        </Link>
        <FavoriteButton filmId={_id} />
      </LeftSide>

      <RightSide>
        {description}
        <p>Director: {director.join(', ')} </p>
        <p>Genre: {genre.map(e => e.name).join(', ')} </p>
        <p>Relised: {relised}</p>
        <p>Duration: {duration}min.</p>
      </RightSide>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 40px;
  width: 600px;
  min-height: 400px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 50px 1fr;
  column-gap: 10px;
  row-gap: 10px;
  background-color: rgba(143, 3, 36, 0.8);
  box-shadow: 0 0 5px 5px rgba(247, 148, 54, 0.7);
  color: white;
`;

const Chapter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  background-color: #8f0324;
  font-size: 30px;
  font-weight: bold;
  grid-column-start: 1; 
  grid-column-end: 3;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
`;

const RightSide = styled.div`
  font-size: 18px;
  font-family: Arial, serif;
  
`;


const Image = styled.img`

`;

const PlayButton = styled.input`
  background-color: #fc8000;
  border: 2px solid #f7dfc6;
  font-size: 20px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  width: 100px;
  height: 30px;
`;
