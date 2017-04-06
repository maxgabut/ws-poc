const WebSocket = require('ws');

const Topic           = require('./topic');
const TopicRepository = require('./topicRepository');
const Connection      = require('./connection');

const PORT = 8080;

const wss = new WebSocket.Server({ port: PORT});
console.log('Server listening on port: %s', PORT);

const topicRepository = new TopicRepository();
topicRepository.save(require('./topics/army.js'));

function registerClient(ws) {
    var connection = new Connection(ws, topicRepository, {
        onMessage: function(message) { console.log('[%s] got message: "%s"', connection.id, message)},
        onClose:   function()        { console.log('[%s] connection closed', connection.id)}
    });
}

wss.on('connection', function connection(ws) {
    registerClient(ws);
});
