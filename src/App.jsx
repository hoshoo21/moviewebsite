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
              <Route path="movie/:id" element={<MovieCard />} />
            </Routes>
          </main>
        </Router>
        <Footer />
      </MovieProvider>
    </div>
  );
}

export default App;
