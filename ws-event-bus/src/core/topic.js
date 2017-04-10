const util = require('util');
const EventEmitter = require('events');

const ArgumentValidator = require('argument-validator');

// EventEmitter emitting messages with 'message' event.
class Topic {

    constructor(id) {
        ArgumentValidator.string(id);

        this._id = id;
    }

}
util.inherits(Topic, EventEmitter);

Topic.prototype.id = function() {
    return this._id;
};

Topic.prototype.setNewListenerCallback = function (callback) {
    if (this._newListenerCallback) {
        this.removeListener('newListener', this._newListenerCallback);
    }

    this._newListenerCallback = callback;
    this.addListener('newListener', callback);
};

Topic.prototype.sendMessage = function(msg) {
    const topicMessage = {topic: this.id(), data: msg};
    this.emit('message', topicMessage);

    // When a new listener connects, it will receive the last message
    this.setNewListenerCallback((event, listener) => {
        if ('message' === event) {
            listener(topicMessage);
        }
    });
};

module.exports = Topic;

