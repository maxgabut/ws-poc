
class Repository {

    constructor() {
        this._map = new Map();
    }

    find(id) {
        return this._map.get(id);
    }

    save(data) {
        return this._map.set(data.id(), data);
    }

    // callback taking value, key and then the map as parameters
    forEach(callback) {
        this._map.forEach(callback);
    }
}

module.exports = Repository;