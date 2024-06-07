import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./styles.css";

const MovieDetails = () => {
  const { id } = useParams(); // Obtener el ID de la película de la URL
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              language: 'en-US',
              api_key: 'c822234de8ff8879df428835d32817db'
            }
          }
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    const fetchMovieCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits`,
          {
            params: {
              language: 'en-US',
              api_key: 'c822234de8ff8879df428835d32817db'
            }
          }
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error('Error fetching movie cast:', error);
      }
    };

    fetchMovieDetails();
    fetchMovieCast();
  }, [id]);

  if (!movieDetails) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1 className='titulo-principal'>{movieDetails.title}</h1>
      <div className="row">
        <div className="col-md-4">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
            alt={movieDetails.title}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-8">
          {/* <h2>{movieDetails.title}</h2> */}
          <p className='banco-gye-desc'>{movieDetails.overview}</p>
          <h3>Cast</h3>
          <ul className="list-group">
            {cast.slice(0,9).map(actor => (
              <li key={actor.id} className="list-group-item">{actor.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
