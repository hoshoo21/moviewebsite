import { React } from 'react';
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Contextpage, { MovieProvider } from './pages/ContextPage';
import './App.css';
import Popular from './pages/Popular';
import UpComing from './pages/UpComing';
import Home from './pages/Home';
import MovieCard from './components/MovieCard';
import AiringToday from './pages/tv/AiringToday';
import TV from './pages/tv/Tv';
import Tv from './pages/tv/Tv';
import OnTheAir from './pages/tv/OnTheAir';
import PopularTv from './pages/tv/PopularTv';
import TopRateTv from './pages/tv/TopRateTv';
import Movie from './pages/Movie';

function App() {
  return (
    <div className="App">
      <MovieProvider>
        <Router>
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="Popular" element={<Popular />}></Route>

              <Route path="Upcoming" element={<UpComing />}></Route>
              <Route path="AiringToday" element={<AiringToday />}></Route>
              <Route path="OnTheAir" element={<OnTheAir />}></Route>
              <Route path="PopularTv" element={<PopularTv />}></Route>
              <Route path="TopRateTv" element={<TopRateTv />}></Route>

              <Route path="movie/:id" element={<Movie />} />
              <Route path="Tv/:id" element={<Tv />} />
            </Routes>
          </main>
        </Router>
        <Footer />
      </MovieProvider>
    </div>
  );
}

export default App;
