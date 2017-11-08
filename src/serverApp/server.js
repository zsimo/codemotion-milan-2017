const restify = require('restify');
const WebSocket = require('ws').Server;

// start the web socket server
const WebSocketServer = new WebSocket({ port: JSON.parse(process.env.W_SOCK_DISPLAY).PORT });

// create the server
const server = restify.createServer();

// configurations
server.pre(restify.plugins.pre.userAgentConnection());
server.use(restify.plugins.bodyParser());

// set up the routes
server.put('/rooms/:id/', (req, res, next) => {

    const room = {
        _id: req.params.id,
        people: req.body.value,
    };

    const message = JSON.stringify(room);

    WebSocketServer.clients.forEach((client) => {
        client.send(message);
    });

    res.send(room);

    return next();
});

// to retrieve all static assets
server.get(/.*/, restify.serveStatic({
    directory: 'public',
}));

// start the server
server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST);
