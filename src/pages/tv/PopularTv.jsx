import { useState, useEffect, useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import MovieCard from '../../components/MovieCard';
import DropdownFilter from '../../components/DropdownFilter';
import PaginationFooter from '../../components/PaginationFooter';
import Contextpage from '../ContextPage';
import '../MoviesGrid.css';
import '../../components/DropdownFilter.css';

const moviesURL = 'https://api.themoviedb.org/3/tv/popular?';
const apiKey = import.meta.env.VITE_API_KEY;
let currentpage = 1;
function PopularTv() {
  const {
    fetchGenre,
    genres,
    fetchCountries,
    countries,
    fetchAdvannceSearch,
    advanceMovies,
  } = useContext(Contextpage);
  const [fulldata, setFullData] = useState(null);

  const [filtermode, setFilterMode] = useState(false);
  const [query, setQuery] = useState('');
  const getAiringToday = async (url, direction) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    };

    const res = await fetch(url, options);
    let data = await res.json();
    data.results = data.results.sort((a, b) => b.vote_average - a.vote_average);
    console.log(data);
    setFullData(data);
  };

  useEffect(() => {
    setCPage();
  }, []);
  useEffect(() => {
    if (currentpage === 1) {
      fetchGenre();
      fetchCountries();
    }
  }, [currentpage]);

  const setCPage = (direction) => {
    if (filtermode === false) {
      const topRatedUrl = `${moviesURL}language=en-US&page=${currentpage}`;
      getAiringToday(topRatedUrl, direction);
    } else {
      let baseQuery = query;
      baseQuery += `&page=${currentpage}`;
      fetchAdvannceSearch(baseQuery, handleFIlteredMovies);
    }
  };
  const setPrevPage = (pagenum) => {
    currentpage = currentpage - 1;
    setCPage('prev');
  };
  const setNextPage = (pagenum) => {
    currentpage = currentpage + 1;
    setCPage('next');
  };
  const fetchFilteredMovies = (country, genre, year) => {
    let advQuery = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false`;

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
  return (
    <div className="container">
      <DropdownFilter
        Genres={genres}
        Countries={countries}
        handleAvanceSearch={fetchFilteredMovies}
      />
      <h2 className="title">Popular Tv Shows</h2>

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
            <MovieCard key={movie.id} movie={movie} media_type="tv" />
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
}

export default PopularTv;
