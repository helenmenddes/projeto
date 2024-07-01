const usuariosController = require('../controllers/usuarioController');

module.exports = [
  { 
    method: 'GET', 
    path: '/usuarios', 
    handler: usuariosController.getAllUsuarios 
  },
  
  {
    method: 'POST',
    path: '/cadastro',
    handler: usuariosController.createUsuario
  },

  {
    method: 'POST',
    path: '/login',
    handler: usuariosController.loginUsuario
  },
  
  { 
    method: 'GET', 
    path: '/usuarios/{id}', 
    handler: usuariosController.getUsuarioById 
  },

  { 
    method: 'POST', 
    path: '/usuarios', 
    handler: usuariosController.createUsuario 
  },

  { 
    method: 'PUT', 
    path: '/usuarios/{id}', 
    handler: usuariosController.updateUsuario 
  },

  { 
    method: 'DELETE', 
    path: '/usuarios/{id}', 
    handler: usuariosController.deleteUsuario 
  }
];
