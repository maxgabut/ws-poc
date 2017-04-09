const util = require('util');
const EventEmitter = require('events');

const ArgumentValidator = require('argument-validator');

// EventEmitter emitting messages with 'message' event.
class Topic {

    constructor(id) {
        ArgumentValidator.string(id);

        this.id = function () { return id; }
    }
}
util.inherits(Topic, EventEmitter);

Topic.prototype.sendMessage = function(msg) {
    const topicMessage = {topic: this.id(), data: msg};
    this.emit('message', topicMessage);
};

module.exports = Topic;

