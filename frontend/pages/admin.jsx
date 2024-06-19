import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid, Card, CardMedia, CardContent, CardActions } from '@mui/material';

const Admin = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: '', posterUrl: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/filmes')
      .then(response => setMovies(response.data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  const handleAddMovie = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/filmes', newMovie)
      .then(response => setMovies([...movies, response.data]))
      .catch(error => console.error('Error adding movie:', error));
  };

  const handleDeleteMovie = (id) => {
    axios.delete(`http://localhost:5000/filmes/${id}`)
      .then(() => setMovies(movies.filter(movie => movie.id !== id)))
      .catch(error => console.error('Error deleting movie:', error));
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Panel
      </Typography>
      <form onSubmit={handleAddMovie}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newMovie.title}
          onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
          required
        />
        <TextField
          label="Poster URL"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newMovie.posterUrl}
          onChange={(e) => setNewMovie({ ...newMovie, posterUrl: e.target.value })}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Movie
        </Button>
      </form>
      <Grid container spacing={3} marginTop={2}>
        {movies.map(movie => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={movie.posterUrl}
                alt={movie.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {movie.title}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="secondary" onClick={() => handleDeleteMovie(movie.id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Admin;
