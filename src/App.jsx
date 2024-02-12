import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Contextpage, { MovieProvider } from './pages/ContextPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <MovieProvider>
        <Navbar />

        <Outlet />
        <Footer />
      </MovieProvider>
    </div>
  );
}

export default App;
