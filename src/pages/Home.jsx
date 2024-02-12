import { useState, useEffect, useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import DropdownFilter from '../components/DropdownFilter';
import PaginationFooter from '../components/PaginationFooter';
import Contextpage from './ContextPage';
import './MoviesGrid.css';
import '../components/DropdownFilter.css';

const moviesURL = 'https://api.themoviedb.org/3/movie/top_rated?';
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const {
    fetchGenre,
    genres,
    fetchCountries,
    countries,
    fetchAdvannceSearch,
    advanceMovies,
  } = useContext(Contextpage);
  const [fulldata, setFullData] = useState(null);
  const [currentpage, setCurrentPage] = useState(1);
  const [filtermode, setFilterMode] = useState(false);
  const [query, setQuery] = useState('');
  const getTopRatedMovies = async (url) => {
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
    setFullData(data);
  };

  useEffect(() => {
    const topRatedUrl = `${moviesURL}language=en-US&page=${currentpage}`;
    console.log('coming to useeffect');
    getTopRatedMovies(topRatedUrl);
  }, []);
  useEffect(() => {
    fetchGenre();
  }, []);
  useEffect(() => {
    fetchCountries();
  }, []);
  const setCPage = () => {
    if (filtermode === false) {
      const topRatedUrl = `${moviesURL}language=en-US&page=${currentpage}`;
      getTopRatedMovies(topRatedUrl);
    } else {
      let baseQuery = query;
      baseQuery += `&page=${currentpage}`;
      fetchAdvannceSearch(baseQuery, handleFIlteredMovies);
    }
  };
  const setPrevPage = (pagenum) => {
    setCurrentPage((prev) => prevNum - 1);
    setCPage();
  };
  const setNextPage = (pagenum) => {
    setCurrentPage(pagenum);
    setCPage();
  };
  const fetchFilteredMovies = (country, genre, year) => {
    let advQuery = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false`;

    if (year) advQuery += `&primary_release_year=${year.label}`;
    if (genre) advQuery += `&with_genres=${genre.value}`;
    if (country) advQuery += `&with_origin_country=${country.value}`;
    if (country) advQuery += `&language=${country.value}`;

    setQuery(advQuery);

    setFilterMode(true);
    advQuery += `&page=${currentpage}`;
    fetchAdvannceSearch(advQuery, handleFIlteredMovies);
  };
  const handleFIlteredMovies = (moviesData) => {
    setFilterMode(true);
    setFullData(moviesData);
  };
  let pagination;
  if (fulldata) {
    //pagination = getPagination();
  }
  return (
    <div className="container">
      <DropdownFilter
        Genres={genres}
        Countries={countries}
        handleAvanceSearch={fetchFilteredMovies}
      />
      <h2 className="title">Top Rated Movies</h2>

      <div className="movies-container">
        {!fulldata && (
          <div className="loader">
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="light" />
            <span className="visually-hidden">See More..</span>
          </div>
        )}
        {fulldata &&
          fulldata.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
      {fulldata && (
        <PaginationFooter
          itemsPerPage={fulldata.results.length}
          total_pages={fulldata.total_pages}
          current_page={currentpage}
          nextpage={setNextPage}
          previouspage={setPrevPage}
          cpage={setCPage}
        />
      )}
    </div>
  );
};

export default Home;
