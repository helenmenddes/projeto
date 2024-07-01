import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CentralizaBox from '../componentes/centralizar.jsx';


const Login = () => {
  const [login, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      //verificação administrador
      if (login === 'admin' && senha === 'admin') {
        navigate('/admin');
        return;
      }
      // lógica para usuário
      const response = await axios.get('http://localhost:4000/usuarios');
      const usuarios = response.data;
      const usuario = usuarios.find(user => user.login === login && user.senha === senha);
      if (usuario) {
        navigate('/filmes');
      } else {
        alert('Login falhou: Informações de Login inválidas');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login');
    }
  };

  return (
    <CentralizaBox>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
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
      <FormControlLabel
        control={
          <Checkbox
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
        }
        label="Remember me"
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
      >
        Login
      </Button>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account?{' '}
        <Link onClick={() => navigate('/cadastro')} style={{ cursor: 'pointer' }}>
          Sign Up
        </Link>
      </Typography>
    </CentralizaBox>
  );
};

export default Login;
