'use strict';

const DEFAULTS = require('../core/defaults.json');

class MapRenderer extends PIXI.Container {

    constructor(data) {
        this.chunks = {};
    }

    addChunk(cX, cY, chunk) {
        const container = new PIXI.Container();
        this.chunks[cX + ";" + cY] = container;

        const w = DEFAULTS.CHUNK_SIZE.WIDTH * DEFAULTS.TILESIZE;
        const h = DEFAULTS.CHUNK_SIZE.HEIGHT * DEFAULTS.TILESIZE;

        for (let y = 0; y < chunk.height; y++) {
            for (let x = 0; x < chunk.width; x++) {
                const i = (y * chunk.width) + x;
                const tile = this._createSprite(chunk.data[i]);
                tile.x = cX * w + x * DEFAULTS.TILESIZE;
                tile.y = cY * h + y * DEFAULTS.TILESIZE;
                container.addChild(tile);
            }
        }
        this.addChild(container);
    }

    _createSprite(data) {
        const s = new PIXI.Sprite(data.sprite);
        return s;
    }
}

module.exports = MapRenderer;