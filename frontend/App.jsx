import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Container } from '@mui/material';
import Login from './components/login.jsx';
import MovieList from './components/home.jsx';
import Cadastro from './pages/cadastro.jsx';

function App() {
  const [isAdmin, setIsAdmin] = useState(false); // Aqui você deve definir a lógica para verificar se o usuário é admin

  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/cadastro" component={Cadastro} />
          <Route path="/movies">
            {isAdmin ? <MovieList isAdmin={isAdmin} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/" exact component={Login} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
