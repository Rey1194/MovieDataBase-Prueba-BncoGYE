import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./styles.css";

const MoviePosters = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 6;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/discover/movie',
          {
            params: {
              include_adult: false,
              include_video: false,
              language: 'en-US',
              sort_by: 'popularity.desc',
              api_key: 'c822234de8ff8879df428835d32817db',
              page: currentPage
            }
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [currentPage]);

  // Divide las películas en páginas de 6 elementos cada una
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="contenedor">
      <h1 className="titulo-principal">Movie Poster Database</h1>
      <div className="row">
        {currentMovies.map(movie => (
          <div key={movie.id} className="col-md-4 mb-3">
            <div className="card">
              <Link to = {`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  className="card-img-top rounded custom-img"
                  alt={movie.title}
                />
              </Link>
              <div className="card-body">
                <div className='tag-container'>  <div className='tag-child'>#Tag</div> </div>
                <h5 className="banco-gye-titulo">{movie.title}</h5>
                <p className="banco-gye-subtitle">
                  Release Date: {movie.release_date}
                </p>
                <p className="banco-gye-desc">
                  Score: {movie.vote_average}
                </p>
                <Link to={`/movie/${movie.id}`} className="banco-gye-boton">Details</Link>
              </div>
            </div>
          </div>
        ))
        }
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button
          className="banco-gye-boton me-2"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <button
          className="banco-gye-boton"
          onClick={handleNextPage}
          disabled={currentMovies.length < moviesPerPage} // Deshabilita el botón si no hay más películas para mostrar
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default MoviePosters;
