
function TopicRepository() {
    this._topicsById = {};
}

TopicRepository.prototype.save = function(topic) {
    this._topicsById[topic.id] = topic;
};

TopicRepository.prototype.find = function(id) {
    return this._topicsById[id];
};

module.exports = TopicRepository;
