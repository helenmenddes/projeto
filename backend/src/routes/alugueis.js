const alugueisController = require('../controllers/alugueisController');

module.exports = [
  { 
    method: 'GET', 
    path: '/alugueis', 
    handler: alugueisController.getAllAlugueis 
  },

  { 
    method: 'GET', 
    path: '/alugueis/{id}', 
    handler: alugueisController.getAluguelById 
  },

  { 
    method: 'POST', 
    path: '/alugueis', 
    handler: alugueisController.createAluguel 
  },

  { 
    method: 'PUT', 
    path: '/alugueis/{id}', 
    handler: alugueisController.updateAluguel 
  },

  { 
    method: 'DELETE', 
    path: '/alugueis/{id}',
    handler: alugueisController.deleteAluguel
  }
];
