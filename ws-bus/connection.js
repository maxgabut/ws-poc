var connectionCount = 0;

function Connection(ws, topicRepository, callbacks = {}) {
    this.id = connectionCount++;
    this._ws = ws;
    this._topicRepository = topicRepository;
    this._joinedTopics = new Set();

    callbacks.onMessage && ws.on('message', callbacks.onMessage);
    callbacks.onClose   && ws.on('close',   callbacks.onClose);

    ws.on('message', this.onMessage.bind(this));
    ws.on('close',   this.onClose.bind(this));
}

Connection.prototype.onMessage = function(message) {
    var jsonMessage;
    try {
        jsonMessage = JSON.parse(message);
    } catch (e) {
        this._ws.send('Failed to parse message: ' + message);
        return;
    }

    switch (jsonMessage.id) {
        case 'join' :
            this.tryAddSelfToTopic(jsonMessage.data);
    }
};

Connection.prototype.tryAddSelfToTopic = function(topicId) {
    var topic = this._topicRepository.find(topicId);

    if (topic) {
        topic.connect(this);
        this._joinedTopics.add(topicId);
        this._ws.send('You just joined: ' + topicId);
    } else {
        this._ws.send('No topic named: ' + topicId);
    }
};

Connection.prototype.onClose = function() {

    var that = this;
    this._joinedTopics.forEach( (topic) => {
        that._topicRepository.find(topic).disconnect(that);
        console.log('Disconnected %s from %s', that.id, topic);
    });
};

Connection.prototype.send = function(msg) {
    this._ws.send(JSON.stringify(msg));
};

module.exports = Connection;
