import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Contextpage = createContext();

export function MovieProvider({ children }) {
  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loader, setLoader] = useState(true);
  const [backgenre, setBackGenre] = useState(false);
  const [advanceMovies, setAdvanceMovies] = useState(null);
  const navigate = useNavigate(); // =====> navigate page

  const APIKEY = import.meta.env.VITE_API_KEY;

  const fetchAdvannceSearch = async (query, hanldeMovieState) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${APIKEY}`,
      },
    };
    const data = await fetch(query, options);
    const searchmovies = await data.json();
    console.log(searchmovies);
    setAdvanceMovies(searchmovies);
    hanldeMovieState(searchmovies);
  };

  const fetchGenre = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${APIKEY}`,
      },
    };

    const data = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?language=en-US`,
      options
    );
    const gen = await data.json();
    console.log(gen.genres);
    setGenres(gen.genres);
  };

  const fetchCountries = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${APIKEY}`,
      },
    };

    const data = await fetch(
      'https://api.themoviedb.org/3/configuration/countries?language=en-US',
      options
    );
    const countriesdata = await data.json();
    setCountries(countriesdata);
  };

  return (
    <Contextpage.Provider
      value={{
        fetchGenre,
        genres,
        fetchCountries,
        countries,
        fetchAdvannceSearch,
        advanceMovies,
      }}
    >
      {children}
    </Contextpage.Provider>
  );
}

export default Contextpage;
