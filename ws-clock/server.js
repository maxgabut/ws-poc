const WebSocket = require('ws');

const PORT = 8080;

const wss = new WebSocket.Server({ port: PORT});
console.log('Server listening on port: %s', PORT);

var clients = [];

function registerClient(ws) {
    console.log('Hello new client !');
    clients.push(ws);
}

function removeClient(ws) {
    console.log('Bye client from');
    clients = clients.filter(function isThisWs(x) { return x !== ws;});
}

function giveTime() {

    var date = new Date().toString();

    console.log('Giving time \'%s\' to all %s clients', date, clients.length);

    clients.forEach(function (ws) {
        ws.send(date);
    });
}

setInterval(giveTime, 1000);

wss.on('connection', function connection(ws) {
    registerClient(ws);

    ws.on('message', function incoming(message) {
       console.log('received: %s', message);
    });

    ws.on('close', function() {removeClient(ws)});

    ws.send('hello, I will give you some time now');
});
