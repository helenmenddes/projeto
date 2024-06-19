import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios';

const MovieList = ({ isAdmin }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies', error);
      }
    };
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/movies/${id}`);
      setMovies(movies.filter(movie => movie.id !== id));
    } catch (error) {
      console.error('Error deleting movie', error);
    }
  };

  return (
    <Container>
      <Grid container spacing={4}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt={movie.title}
                height="400"
                image={movie.imageUrl}
                title={movie.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.genre} - {movie.year}
                </Typography>
                {isAdmin && (
                  <Button onClick={() => handleDelete(movie.id)} variant="contained" color="secondary">
                    Delete
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MovieList;
