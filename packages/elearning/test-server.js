// app.js
const express = require('express');
const next = require('next');
const socketServer = require('./server/socketServer');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const nextHandler = app.getRequestHandler();


app.prepare().then(() => {
    const server = express();

    // Definimos una URL para obtener los mensajes
    server.get('/messages', (req, res) => {
        // Respondemos con la lista de mensajes serializada como JSON
        res.json(messages);
    });

    // Para cualquier otra ruta de la aplicación
    server.get('*', (req, res) => {
        // Dejamos que el manejador de Next se encargue y responda con el HTML o un 404
        return nextHandler(req, res);
    });

    // Creamos un servidor HTTP desde nuestra aplicación de Express
    const httpServer = require('http').createServer(server);

    // Iniciamos nuestro servidor de sockets
    socketServer(httpServer);

    // Iniciamos el servidor HTTP en el puerto 3000
    httpServer.listen(3000, (err) => {
        if (err) process.exit(0);
        console.log('> Ready on http://localhost:3000');
    });
});
