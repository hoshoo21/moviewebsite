import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import PaginationFooter from '../components/PaginationFooter';
import './MoviesGrid.css';

const moviesURL = 'https://api.themoviedb.org/3/movie/top_rated?';
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [fulldata, setFullData] = useState(null);
  const [currentpage, setCurrentPage] = useState(1);

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

    setFullData(data);
  };

  useEffect(() => {
    const topRatedUrl = `${moviesURL}language=en-US&page=${currentpage}`;
    console.log('coming to useeffect');
    getTopRatedMovies(topRatedUrl);
  }, []);
  const setCPage = (pagenum) => {
    console.log(pagenum);
    setCurrentPage(pagenum);
    const topRatedUrl = `${moviesURL}language=en-US&page=${currentpage}`;
    getTopRatedMovies(topRatedUrl);
  };
  const setPrevPage = () => {
    setCurrentPage(page - 1);
  };
  const setNextPage = () => {
    setCurrentPage(page + 1);
  };

  let pagination;
  if (fulldata) {
    //pagination = getPagination();
  }
  return (
    <div className="container">
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
      <nav>
        {fulldata && (
          <PaginationFooter
            total_pages={fulldata.total_pages}
            current_page={currentpage}
            nextpage={setNextPage}
            previouspage={setPrevPage}
            cpage={setCPage}
          />
        )}
      </nav>
    </div>
  );
};

export default Home;
