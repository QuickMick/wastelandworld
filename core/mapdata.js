 'use strict';

 const DEFAULTS = require('./../defaults.json');

 class MapData {
     constructor(chunks) {
         this.data = chunks;
     }

     getChunk(x, y) {
         return this.data[x + ":" + y];
     }

     setChunk(x, y) {
         return this.data[x + ":" + y];
     }

     isChunkExisting(x, y) {
         return this.getChunk(x, y) ? true : false;
     }
 }

 module.exports = Map;