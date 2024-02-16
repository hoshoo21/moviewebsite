import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true }) => {
  const navigate = useNavigate();
  const hanldeRoute = (evt) => {
    evt.preventDefault();
    console.log(evt);
    navigate(evt.target.pathname);
  };
  return (
    <div className="movie-card">
      <img src={imageUrl + movie.poster_path} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>
        <FaStar /> {Math.ceil(movie.vote_average).toFixed(2)}
      </p>
      {showLink && (
        <a href={`/movie/${movie.id}`} onClick={hanldeRoute}>
          Read More
        </a>
      )}
    </div>
  );
};

export default MovieCard;
