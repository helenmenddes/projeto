const Aluguel = require('../models/aluguel');
const Boom = require('@hapi/boom');

const getAllAlugueis = async (request, h) => {
  try {
    const alugueis = await Aluguel.getAll();
    return h.response(alugueis).code(200);
  } catch (error) {
    return Boom.internal('Internal Server Error', error);
  }
};

const getAluguelById = async (request, h) => {
  try {
    const aluguel = await Aluguel.getById(request.params.id);
    if (!aluguel) {
      return Boom.notFound('Aluguel não encontrado');
    }
    return h.response(aluguel).code(200);
  } catch (error) {
    return Boom.badRequest('Id inválida', error);
  }
};

const createAluguel = async (request, h) => {
  try {
    const { usuario_id, filme_id } = request.payload;
    if (!usuario_id || !filme_id) {
      return Boom.badRequest('Todos os itens são necessários: ID usuário E ID do filme');
    }
    const newAluguel = await Aluguel.create(request.payload);
    return h.response(newAluguel).code(201);
  } catch (error) {
    return Boom.internal('Internal Server Error', error);
  }
};

const updateAluguel = async (request, h) => {
  try {
    const { id } = request.params;
    const { usuario_id, filme_id } = request.payload;
    if (!usuario_id || !filme_id) {
      return Boom.badRequest('Todos os itens são necessários: ID usuário E ID do filme');
    }
    const updatedAluguel = await Aluguel.update(id, request.payload);
    if (!updatedAluguel) {
      return Boom.notFound('Aluguel não encontrado');
    }
    return h.response(updatedAluguel).code(200);
  } catch (error) {
    return Boom.badRequest('Id inválida', error);
  }
};

const deleteAluguel = async (request, h) => {
  try {
    const { id } = request.params;
    const aluguel = await Aluguel.getById(id);
    if (!aluguel) {
      return Boom.notFound('Aluguel não encontrado');
    }
    await Aluguel.delete(id);
    return h.response().code(204);
  } catch (error) {
    return Boom.badRequest('Id inválida', error);
  }
};

module.exports = {
  getAllAlugueis,
  getAluguelById,
  createAluguel,
  updateAluguel,
  deleteAluguel,
};
