const Hapi = require('@hapi/hapi');
const filmesRoutes = require('./routes/filmes');
const usuariosRoutes = require('./routes/usuarios');
const alugueisRoutes = require('./routes/alugueis');
//const cors = require('hapi-cors');

const init = async () => {
  const server = Hapi.server({
    port: 4000,
    host: 'localhost',
    "routes": {"cors": {"origin": ['http://localhost:3000'], headers: ["Accept","Content-Type"], "additionalHeaders": ["X-Requested-Width"]}}
  });

  server.route(filmesRoutes);
  server.route(usuariosRoutes);
  server.route(alugueisRoutes);

  await server.start();
  console.log('Servidor ON %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
