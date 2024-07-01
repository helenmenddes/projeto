const db = require('../db');

const Usuario = {
  getAll: () => db.select('*').from('usuarios'),
  getByLogin: (login) => db('usuarios').where({ login }).first(),
  getByLoginAndSenha: (login, senha) => db('usuarios').where({ login, senha }).first(),
  getById: (id) => db('usuarios').where({ id }).first(),
  create: (usuario) => db('usuarios').insert(usuario).returning('*'),
  update: (id, usuario) => db('usuarios').where({ id }).update(usuario).returning('*'),
  delete: (id) => db('usuarios').where({ id }).del(),
};

module.exports = Usuario;
