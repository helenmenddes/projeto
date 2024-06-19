const db = require('../db');

const Aluguel = {
  getAll: () => db.select('*').from('alugueis'),
  getById: (id) => db('alugueis').where({ id }).first(),
  create: (aluguel) => db('alugueis').insert(aluguel).returning('*'),
  update: (id, aluguel) => db('alugueis').where({ id }).update(aluguel).returning('*'),
  delete: (id) => db('alugueis').where({ id }).del(),
};

module.exports = Aluguel;
