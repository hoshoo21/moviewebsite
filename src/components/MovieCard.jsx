import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';

const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true }) => {
  return (
    <div className="movie-card">
      <img src={imageUrl + movie.poster_path} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>
        <FaStar /> {Math.ceil(movie.vote_average).toFixed(2)}
      </p>
      {showLink && <Link to={`/movie/${movie.id}`}>Read More</Link>}
    </div>
  );
};

export default MovieCard;
