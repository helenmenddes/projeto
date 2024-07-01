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

const createUsuario = async (request, h) => {
  try {
    const { nome, login, senha } = request.payload;
    if (!nome || !login || !senha) {
      return Boom.badRequest('Todos os itens são necessários: nome, login e senha');
    }
    const existingUser = await Usuario.getByLogin(login);
    if (existingUser) {
      return h.response({ success: false, message: 'Email já cadastrado' }).code(400);
    }
    const newUser = await Usuario.create({ nome, login, senha });
    return h.response({ success: true, user: newUser }).code(201);
  } catch (error) {
    return Boom.internal('Internal Server Error', error);
  }
};

const loginUsuario = async (request, h) => {
  try {
    const { login, senha } = request.payload;
    
    if (login === 'admin' && senha === 'admin') {
      return h.response({ success: true, isAdmin: true }).code(200);
    }
    const user = await Usuario.getByLoginAndSenha(login, senha);
    if (user) {
      return h.response({ success: true, user }).code(200);
    } else {
      return h.response({ success: false, message: 'Informações de Login inválidas' }).code(401);
    }
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
  loginUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
