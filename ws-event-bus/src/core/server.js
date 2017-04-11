const WebSocket = require('ws');

const Connection = require('app/core/connection');
const Repository = require('app/core/repository');

class Server {

    constructor({port = 8080, topics = []}) {
        console.log('Creating server listening on port: ', port);

        this._wss = new WebSocket.Server({ port });
        this._topicRepository = new Repository();

        topics.forEach( t => {
            console.log('Registering topic: ', t.id());
            this._topicRepository.save(t);
        });

        this.onConnection = this.onConnection.bind(this);
        this._wss.on('connection', this.onConnection);
    }

    onConnection(ws) {
        let connection = new Connection(this._topicRepository, ws);
        console.log('New connection created: ', connection.id());
    }
}

module.exports = Server;
