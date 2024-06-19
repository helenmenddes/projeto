const filmesController = require('../controllers/filmesController');

module.exports = [
  { 
    method: 'GET', 
    path: '/filmes', 
    handler: filmesController.getAllFilmes 
  },

  { 
    method: 'GET', 
    path: '/filmes/{id}', 
    handler: filmesController.getFilmeById 
  },

  { 
    method: 'POST', 
    path: '/filmes', 
    handler: filmesController.createFilme 
  },

  { 
    method: 'PUT', 
    path: '/filmes/{id}', 
    handler: filmesController.updateFilme 
  },

  { 
    method: 'DELETE', 
    path: '/filmes/{id}', 
    handler: filmesController.deleteFilme 
  }
];
