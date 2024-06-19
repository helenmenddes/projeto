const Usuario = require('../models/usuario');
const Boom = require('@hapi/boom');

const getAllUsuarios = async (request, h) => {
  try {
    const usuarios = await Usuario.getAll();
    return h.response(usuarios).code(200);
  } catch (error) {
    return Boom.internal('Internal Server Error', error);
  }
};

const getUsuarioById = async (request, h) => {
  try {
    const usuario = await Usuario.getById(request.params.id);
    if (!usuario) {
      return Boom.notFound('Usuário não encontrado');
    }
    return h.response(usuario).code(200);
  } catch (error) {
    return Boom.badRequest('Id inválido', error);
  }
};

const createUsuario = async (request, h) => {
  try {
    const { nome, login, senha } = request.payload;
    if (!nome || !login || !senha) {
      return Boom.badRequest('Todos os itens são necessários: nome, login e senha');
    }
    const newUsuario = await Usuario.create(request.payload);
    return h.response(newUsuario).code(201);
  } catch (error) {
    return Boom.internal('Internal Server Error', error);
  }
};

const updateUsuario = async (request, h) => {
  try {
    const { id } = request.params;
    const { nome, login, senha } = request.payload;
    if (!nome || !login || !senha) {
      return Boom.badRequest('Todos os itens são necessários: nome, login e senha');
    }
    const updatedUsuario = await Usuario.update(id, request.payload);
    if (!updatedUsuario) {
      return Boom.notFound('Usuário não encontrado');
    }
    return h.response(updatedUsuario).code(200);
  } catch (error) {
    return Boom.badRequest('Id inválido', error);
  }
};

const deleteUsuario = async (request, h) => {
  try {
    const { id } = request.params;
    const usuario = await Usuario.getById(id);
    if (!usuario) {
      return Boom.notFound('Usuário não encontrado');
    }
    await Usuario.delete(id);
    return h.response().code(204);
  } catch (error) {
    return Boom.badRequest('Id inválido', error);
  }
};

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
