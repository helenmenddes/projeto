const Hapi = require('@hapi/hapi');
const filmesRoutes = require('./routes/filmes');
const usuariosRoutes = require('./routes/usuarios');
const alugueisRoutes = require('./routes/alugueis');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
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
