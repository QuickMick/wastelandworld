'use strict';

class Tile {
    constructor(tile) {
        tile = tile || {};
        this.sprite = tile.sprite;
        this.flags = new Set(tile.flags);
    }
}

module.exports = Tile;