'use strict';

const DEFAULTS = require('./../defaults.json');

const createEmptyData = function (layers) {
    const result = [];
    const size = layers || DEFAULTS.CHUNK_SIZE.WIDTH * DEFAULTS.CHUNK_SIZE.HEIGHT;
    for (let i = 0; i < CHUNK_LAYERS; i++) {
        new Array(size);
    }
    return result;
}

class Chunk {
    constructor(chunk) {
        chunk = chunk || {};
        this.data = chunk.data || createEmptyData();
        this.width = chunk.witdh || DEFAULTS.CHUNK_SIZE.WIDTH;
        this.height = chunk.height || DEFAULTS.CHUNK_SIZE.HEIGHT;
    }

    /**
     * if just one parameter is passed, 
     * returns the original item,
     * otherwise it returns the tile of the coordinate
     * 
     * @param {any} x 
     * @param {any} y optional
     * @returns a tile,
     * @memberof Chunk
     */
    getTile(layer, x, y) {
        if (y === undefined) return this.data[x];
        return this.data[layer][y * this.width + x];
    }

    setTile(layer, x, y, val) {
        if (arguments.length === 3) return this.data[x] = y;
        return this.data[layer][y * this.width + x] = val;
    }
    // https://gist.github.com/JohnArcher/10719520
}

module.exports = Chunk;