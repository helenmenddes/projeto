import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Card, CardMedia, Grid, Box, IconButton, Avatar, Dialog, AppBar, Toolbar, Autocomplete, Menu, MenuItem, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import CentralizaBox from '../componentes/centralizar.jsx';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const Admin = () => {
  const [filmes, setFilmes] = useState([]);
  const [novoFilme, setNovoFilme] = useState({
    cartaz: '',
    titulo: '',
    descricao: '',
    categoria: '',
    elenco: ''
  });
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredFilmes, setFilteredFilmes] = useState([]);
  const [selectedFilme, setSelectedFilme] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFilmes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/filmes');
        setFilmes(response.data);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    };
    fetchFilmes();
  }, []);

  useEffect(() => {
    setFilteredFilmes(
      filmes.filter(filme => 
        filme.titulo.toLowerCase().includes(searchValue.toLowerCase()) &&
        (categoriaSelecionada ? filme.categoria === categoriaSelecionada : true)
      )
    );
  }, [searchValue, filmes, categoriaSelecionada]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoFilme(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddFilme = async () => {
    try {
      const response = await axios.post('http://localhost:4000/filmes', novoFilme);
      if (response.data.success) {
        setFilmes([...filmes, response.data.filme]);
        setNovoFilme({ cartaz: '', titulo: '', descricao: '', categoria: '', elenco: '' });
        setOpen(false);
      } else {
        alert('Erro ao adicionar filme');
      }
    } catch (error) {
      console.error('Erro ao adicionar filme:', error);
    }
  };

  const handleUpdateFilme = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/filmes/${selectedFilme.id}`, selectedFilme);
      if (response.data.success) {
        setFilmes(filmes.map(filme => filme.id === selectedFilme.id ? response.data.filme : filme));
        setOpenDetails(false);
      } else {
        alert('Erro ao atualizar filme');
      }
    } catch (error) {
      console.error('Erro ao atualizar filme:', error);
    }
  };

  const handleDeleteFilme = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/filmes/${selectedFilme.id}`);
      if (response.data.success) {
        setFilmes(filmes.filter(filme => filme.id !== selectedFilme.id));
        setOpenDetails(false);
      } else {
        alert('Erro ao deletar filme');
      }
    } catch (error) {
      console.error('Erro ao deletar filme:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDetailsOpen = (filme) => {
    setSelectedFilme(filme);
    setOpenDetails(true);
  };

  const handleDetailsClose = () => {
    setOpenDetails(false);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem('nome');
    navigate('/login'); // Use navigate instead of history.push
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategoriaClick = (categoria) => {
    setCategoriaSelecionada(categoria);
  };

  const nome = localStorage.getItem('nome');
  const avatarLetter = nome ? nome.charAt(0).toUpperCase() : '';

  return (
    <Box sx={{ width: '95%', margin: 'auto', mt: 2 }}>
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar>
          <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/320px-Netflix_2015_logo.svg.png" alt="Netflix Logo" sx={{ height: 35, mr: 2 }} />
          <Autocomplete
            freeSolo
            options={filmes.map((filme) => filme.titulo)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Pesquisar"
                variant="outlined"
                onChange={(e) => setSearchValue(e.target.value)}
                sx={{ flexGrow: 1, mr: 2, width: '70%' }} 
              />
            )}
          />
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
            <Button color="inherit" onClick={() => handleCategoriaClick('Filme')}>Filme</Button>
            <Button color="inherit" onClick={() => handleCategoriaClick('TV Show')}>TV Show</Button>
            <Button color="inherit" onClick={() => handleCategoriaClick('Infantil')}>Infantil</Button>
            <IconButton color="inherit" onClick={handleClickOpen}>
              <AddIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleAvatarClick}>
              <Avatar>{avatarLetter}</Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}>
        {filteredFilmes.map(filme => (
          <Grid item xs={6} sm={3} md={2} key={filme.id}>
            <Card onClick={() => handleDetailsOpen(filme)}>
              <CardMedia
                component="img"
                height="555"
                image={filme.cartaz}
                alt={filme.titulo}
                sx={{ objectFit: 'fit' }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <CentralizaBox>
          <Typography variant="h4" gutterBottom>
            Adicionar Filme
          </Typography>
          <form noValidate autoComplete="off">
            <TextField
              label="Cartaz"
              name="cartaz"
              value={novoFilme.cartaz}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Título"
              name="titulo"
              value={novoFilme.titulo}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Descrição"
              name="descricao"
              value={novoFilme.descricao}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Categoria"
              name="categoria"
              value={novoFilme.categoria}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Elenco"
              name="elenco"
              value={novoFilme.elenco}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleAddFilme} fullWidth>
              Adicionar Filme
            </Button>
          </form>
        </CentralizaBox>
      </Dialog>
      <Dialog open={openDetails} onClose={handleDetailsClose} fullWidth>
        <DialogTitle>Detalhes do Filme</DialogTitle>
        <DialogContent>
          {selectedFilme && (
            <Box>
              <CardMedia
                component="img"
                height="300"
                image={selectedFilme.cartaz}
                alt={selectedFilme.titulo}
                sx={{ objectFit: 'cover', mb: 2 }}
              />
              <TextField
                label="Cartaz"
                name="cartaz"
                value={selectedFilme.cartaz}
                onChange={(e) => setSelectedFilme({ ...selectedFilme, cartaz: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Título"
                name="titulo"
                value={selectedFilme.titulo}
                onChange={(e) => setSelectedFilme({ ...selectedFilme, titulo: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Descrição"
                name="descricao"
                value={selectedFilme.descricao}
                onChange={(e) => setSelectedFilme({ ...selectedFilme, descricao: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Categoria"
                name="categoria"
                value={selectedFilme.categoria}
                onChange={(e) => setSelectedFilme({ ...selectedFilme, categoria: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Elenco"
                name="elenco"
                value={selectedFilme.elenco}
                onChange={(e) => setSelectedFilme({ ...selectedFilme, elenco: e.target.value })}
                fullWidth
                margin="normal"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleUpdateFilme}>Alterar</Button>
          <Button color="secondary" onClick={handleDeleteFilme}>Deletar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Admin;
