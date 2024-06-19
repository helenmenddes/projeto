const db = require('../db');

const Filme = {
  getAll: () => db.select('*').from('filmes'),
  getById: (id) => db('filmes').where({ id }).first(),
  create: (filme) => db('filmes').insert(filme).returning('*'),
  update: (id, filme) => db('filmes').where({ id }).update(filme).returning('*'),
  delete: (id) => db('filmes').where({ id }).del(),
};

module.exports = Filme;
