const Topic = require('app/core/topic');

let nextConnectionId = 0;

class Connection {

    constructor(topicRepository, webSocketConnection) {
        this._id = nextConnectionId++;
        this._topicRepository = topicRepository;
        this._ws = webSocketConnection;

        this._joinedTopics = new Set();

        this.sendRaw = this.sendRaw.bind(this);
        this.onMessageFromWs = this.onMessageFromWs.bind(this);
        this.onWsClose = this.onWsClose.bind(this);

        // message published on log topic will be pushed down this connection
        this._logTopic = new Topic('log');
        this._logTopic.on('message', this.sendRaw);

        // message commit from connection will be treated by a callback
        this._ws.on('message', this.onMessageFromWs);

        this._ws.on('close', this.onWsClose);
    }

    id() {
        return this._id;
    }

    log(msg) {
        console.log('[%s] < %s', this._id, msg);
        this._logTopic.sendMessage(msg);
    }

    // Callback for topics, will send whatever is passed, with no wrapping whatsoever.
    sendRaw(msg) {
        this._ws.send(msg);
    }

    onWsClose() {
        let that = this;
        this._joinedTopics.forEach( (topic) => {
            that._topicRepository.find(topic).disconnect(that);
            this.log('Disconnected %s from %s', that.id, topic);
        });
        console.log('Connection closed: ', this._id);
    };

    onMessageFromWs(jsonMessage) {
        console.log('[%s] > %s', this._id, jsonMessage);
        let objectMessage;
        try {
            objectMessage = JSON.parse(jsonMessage);
        } catch (e) {
            this.log('Failed to parse message: ' + jsonMessage);
            return;
        }

        switch (objectMessage.action) {
            case 'join' :
                this.startListeningToTopic(objectMessage.data);
                return;
            default :
                this.log('No action known as: ' + objectMessage.action);
                return;
        }
    }

    startListeningToTopic(topicId) {
        let topic = this._topicRepository.find(topicId);

        if (topic) {
            topic.on('message', this.sendRaw);
            this._joinedTopics.add(topicId);
            this.log('Added to topic: ' + topicId);
        } else {
            this.log('No topic named: ' + topicId);
        }
    }
}

module.exports = Connection;
