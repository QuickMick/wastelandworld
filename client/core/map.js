'use strict';

const DEFAULTS = require('./../defaults.json');

class Tile {
    constructor(tile) {
        this.flags = new Set(tile.flags);
    }
}

class Chunk {
    constructor(chunk) {
        this.data = chunk.data || new Array(DEFAULTS.CHUNK_SIZE.WIDTH * DEFAULTS.CHUNK_SIZE.HEIGHT);
        this.width = chunk.witdh || DEFAULTS.CHUNK_SIZE.WIDTH;
        this.height = chunk.height || DEFAULTS.CHUNK_SIZE.HEIGHT;
    }

    // https://gist.github.com/JohnArcher/10719520
}


class Map {
    constructor() {

    }
}




module.exports = Map;