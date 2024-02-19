import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from 'react-icons/bs';

import './Movie.css';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [movieCast, setMovieCast] = useState(null);

  const getMoiveCast = async (url) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    };

    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data);
    const movieUrl = `${moviesURL}/movie/${id}?language=en`;
    setMovieCast(data);

    getMovie(movieUrl);
  };

  const getMovie = async (url) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    };

    const res = await fetch(url, options);
    const data = await res.json();

    setMovie(data);
  };

  const formatCurrency = (number) => {
    // return new Intl.NumberFormat('pt-BR', {
    //   style: 'currency',
    //   currency: 'BRL',
    // }).format(number);

    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  useEffect(() => {
    console.log(id);
    const moviecasturl = `https://api.themoviedb.org/3/movie/${id}/credits?language=en`;
    getMoiveCast(moviecasturl);
  }, []);
  let cast;
  if (movieCast) {
    cast = movieCast.cast.map((actor, id) => {
      if (id < 10) {
        return (
          <div className="flex-row-item">
            <p>{actor.name}</p>
            <br />
            <img src={`http://image.tmdb.org/t/p/w500/${actor.profile_path}`} />
          </div>
        );
      }
    });
  }

  return (
    <div className="movie-page">
      {movie && (
        <>
          <div className="movie-card-items">
            <MovieCard movie={movie} showLink={false} />
            <p className="tagline">{movie.tagline}</p>
          </div>

          <div className="info">
            <h3>
              <div className="row">
                <h3>Cast:</h3>
              </div>
            </h3>

            <div className="flex-row-container">{cast}</div>
          </div>

          <div className="info">
            <h3>
              <BsWallet2 />
              Budget:
            </h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>

          <div className="info">
            <h3>
              <BsGraphUp />
              Revenue:
            </h3>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>

          <div className="info">
            <h3>
              <BsHourglassSplit />
              Duration:
            </h3>
            <p>{movie.runtime} minutos</p>
          </div>

          <div className="info description">
            <h3>
              <BsFillFileEarmarkTextFill />
              Movie Overview :
            </h3>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;
