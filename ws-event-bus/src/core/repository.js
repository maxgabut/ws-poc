
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
}

module.exports = Repository;