import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import axios from 'axios';
import MovieCard from '../componentes/cardfilme.jsx';

const MovieList = ({ isAdmin }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('/filmes');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies', error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <Container>
      <Grid container spacing={4}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4}>
            <MovieCard movie={movie} isAdmin={isAdmin} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MovieList;

