
function Topic(id) {
    this.id = id;

    this._connectionsById = {};
}

Topic.prototype.connect = function(connection) {
    this._connectionsById[connection.id] = connection;
};

Topic.prototype.disconnect = function(connection) {
    delete this._connectionsById[connection.id];
};

module.exports = Topic;
