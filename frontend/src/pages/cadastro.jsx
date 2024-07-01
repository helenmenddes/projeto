import React, { useState } from 'react';
import { TextField, Button, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CentralizaBox from '../componentes/centralizar.jsx';

const Register = () => {
  const [nome, setNome] = useState('');
  const [login, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:4000/usuarios', {
        nome,
        login,
        senha
      });
      const data = response.data;
      alert(data.message || 'Cadatrado com sucesso');
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer Cadastro:', error);
      alert('Email já cadastrado');
    }
  };


  return (
    <CentralizaBox>
      <Typography variant="h5" gutterBottom>
        Cadastro
      </Typography>
      <TextField
        label="Nome"
        fullWidth
        margin="normal"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={login}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={senha}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleRegister}
      >
        Cadastre-se
      </Button>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Already have an account?{' '}
        <Link onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>
          Login
        </Link>
      </Typography>
    </CentralizaBox>
  );
};

export default Register;
