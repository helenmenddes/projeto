const Filme = require('../models/filme');
const Boom = require('@hapi/boom');

const getAllFilmes = async (request, h) => {
  try {
    const filmes = await Filme.getAll();
    return h.response(filmes).code(200);
  } catch (error) {
    return Boom.internal('Internal Server Error', error);
  }
};

const getFilmeById = async (request, h) => {
  try {
    const filme = await Filme.getById(request.params.id);
    if (!filme) {
      return Boom.notFound('Filme não encontrado');
    }
    return h.response(filme).code(200);
  } catch (error) {
    return Boom.badRequest('Id inválido', error);
  }
};

const createFilme = async (request, h) => {
  try {
    const { titulo, cartaz, descricao, categoria, elenco } = request.payload;
    if (!titulo || !cartaz || !descricao || !categoria || !elenco) {
      return Boom.badRequest('Todos os itens são necessários: título, cartaz, descrição, categoria e elenco');
    }
    const newFilme = await Filme.create(request.payload);
    return h.response(newFilme).code(201);
  } catch (error) {
  return Boom.internal('Internal Server Error', error);
  }
};

const updateFilme = async (request, h) => {
  try {
    const { id } = request.params;
    const { titulo, cartaz, descricao, categoria, elenco } = request.payload;
    if (!titulo || !cartaz || !descricao || !categoria || !elenco) {
      return Boom.badRequest('Todos os itens são necessários: título, cartaz, descrição, categoria e elenco');
    }
    const updatedFilme = await Filme.update(id, request.payload);
    if (!updatedFilme) {
      return Boom.notFound('Filme não encontrado');
    }
    return h.response(updatedFilme).code(200);
  } catch (error) {
    return Boom.badRequest('Id inválido', error);
  }
};

const deleteFilme = async (request, h) => {
  try {
    const { id } = request.params;
    const filme = await Filme.getById(id);
    if (!filme) {
      return Boom.notFound('Filme não encontrado');
    }
    await Filme.delete(id);
    return h.response().code(204);
  } catch (error) {
    return Boom.badRequest('Id inválido', error);
  }
};

module.exports = {
  getAllFilmes,
  getFilmeById,
  createFilme,
  updateFilme,
  deleteFilme,
};
