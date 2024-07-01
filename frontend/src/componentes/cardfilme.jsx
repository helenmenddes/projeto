import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const MovieCard = ({ filme, isAdmin }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        alt={filme.titulo}
        height="140"
        image={filme.posterUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {filme.titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {filme.descricao}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {filme.categoria}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cast: {filme.elenco.join(', ')}
        </Typography>
        {isAdmin && (
          <div>
            <Button variant="contained" color="secondary">
              Editar
            </Button>
            <Button variant="contained" color="error">
              Deletar
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MovieCard;
