import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

import PaginationFooter from '../components/PaginationFooter';
import MovieCard from '../components/MovieCard';

import './MoviesGrid.css';

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
  const [searchParams] = useSearchParams();
  const [currentsearchpage, setCurrentSearchPage] = useState(1);

  const [movies, setMovies] = useState(null);
  const query = searchParams.get('q');

  const getSearchedMovies = async (url) => {
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
    setMovies(data);
  };

  const handlenextpage = () => {};
  const handleprevpage = () => {};
  const handleCurrentSearchPage = (pagenum) => {
    const searchWithQueryURL = `https://api.themoviedb.org/3/search/movie?query=${query}&page=${pagenum}`;
    getSearchedMovies(searchWithQueryURL);
    setCurrentSearchPage(pagenum);
  };
  useEffect(() => {
    const searchWithQueryURL = `https://api.themoviedb.org/3/search/movie?query=${query}&page=${currentsearchpage}`;
    getSearchedMovies(searchWithQueryURL);
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        Search <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {movies === 0 && (
          <div className="loader">
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {movies &&
          movies.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
      <nav>
        {movies && (
          <PaginationFooter
            total_pages={movies.total_pages}
            current_page={currentsearchpage}
            nextpage={handlenextpage}
            previouspage={handleprevpage}
            cpage={handleCurrentSearchPage}
          />
        )}
      </nav>
    </div>
  );
};

export default Search;
