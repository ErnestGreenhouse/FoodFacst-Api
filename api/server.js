const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');  // Tu db.json con productos, nutricionistas, etc.
const middlewares = jsonServer.defaults();

// Usar los middlewares por defecto (logging, CORS, etc.)
server.use(middlewares);

// Reescribe las URLs para simplificar las rutas de acceso
server.use(jsonServer.rewriter({
    '/api/*': '/$1',  // Esto elimina el prefijo /api en tus peticiones
    '/producto/:recurso/:id/ver': '/:recurso/:id'  // Ejemplo para rutas específicas, si lo necesitas
}));

// Usar el router para manejar las peticiones a la API (los datos de db.json)
server.use(router);

// Iniciar el servidor en el puerto 3000 o el puerto definido por Heroku
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`El servidor JSON está funcionando en el puerto ${port}`);
});

// Exportar el servidor para ser utilizado en otros archivos si es necesario
module.exports = server;
