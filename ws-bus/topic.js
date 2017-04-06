
function Topic(id, onJoin) {
    this.id = id;

    this._connectionsById = {};
    this._onJoin = onJoin;
}

Topic.prototype.connect = function(connection) {
    this._connectionsById[connection.id] = connection;
    this._onJoin && this._onJoin(connection);
};

Topic.prototype.disconnect = function(connection) {
    delete this._connectionsById[connection.id];
};

Topic.prototype.pushToOne = function(connection, msg) {
    let topicMsg = {id: this.id, data: msg};
    connection.send(topicMsg);
};

Topic.prototype.pushToAll = function(msg) {
    var that = this;
    Object.entries(this._connectionsById).forEach( ([id, connection]) => {
        that.pushToOne(connection, msg);
    });
};

module.exports = Topic;
