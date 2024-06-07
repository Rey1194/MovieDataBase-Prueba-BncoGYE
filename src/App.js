import React from 'react';
import './App.css';
import MoviePosters from './components/MoviePosters';
import MovieDetails from './components/MovieDetails';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MoviePosters />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
