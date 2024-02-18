import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from 'react-icons/bs';
import MovieCard from '../../components/MovieCard';
import '../Movie.css';
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const Tv = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [movieCast, setMovieCast] = useState(null);
  const [isExpanded, setExpanded] = useState(true);

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
    const movieUrl = `${moviesURL}/tv/${id}?language=en`;
    setMovieCast(data);

    getTV(movieUrl);
  };

  const getTV = async (url) => {
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
    setMovie(data);
  };

  const formatCurrency = (number) => {
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  useEffect(() => {
    console.log(id);
    const moviecasturl = `https://api.themoviedb.org/3/tv/${id}/credits?language=en`;
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
  let seasons = movie?.seasons.map((season, id) => {
    return (
      <div>
        <p className="flex-row-item-episodes"> {season.name}</p>

        <p className="flex-row-item-contents">
          Episodes: {season.episode_count}
        </p>
        <p className="flex-row-item-contents">
          Air Date: <br /> {season.air_date}
        </p>
      </div>
    );
  });
  return (
    <div className="movie-page">
      {movie && (
        <>
          <div className="movie-card-items">
            <MovieCard movie={movie} showLink={false} />
            <p className="tagline">{movie.tagline}</p>
          </div>

          <div className="info">
            <div className="row">
              <h3>Cast:</h3>
            </div>

            <div className="flex-row-container">{cast}</div>
          </div>

          <div className="info description">
            <h3>
              <BsFillFileEarmarkTextFill />
              Overview :
            </h3>
            <p>{movie.overview}</p>
          </div>
          <div className="info-seasons">
            <h3>Seasons:</h3>

            <div className="flex-row-container-season">{seasons}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Tv;
