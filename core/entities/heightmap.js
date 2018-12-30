const THREE = require('three');
const CANNON = require('cannon');

const s2m = require('./../util/shapetomesh');
const Entity = require('./entity');

const data = require('./../../content/chunk.json');

class HeightMap extends Entity {
    constructor(chunk) {
        chunk = data;
        const geometry = new THREE.PlaneGeometry(chunk.width, chunk.height, chunk.width - 1, chunk.height - 1);
        const texture = THREE.ImageUtils.loadTexture('content/hightmap2.png');

        const material = new THREE.MeshLambertMaterial({
            map: texture
        });
        // var material = new THREE.MeshBasicMaterial({
        //     map: texture,
        //     side: THREE.DoubleSide
        // });

        super(geometry, material);

        const chunkMatrix = [];
        let cur = [];
        for (var i = 0; i < chunk.data.length; i++) {
            // for (var i = 0; i < this.geometry.vertices.length; i++) {
            if (i % chunk.width === 0) {
                cur = [];
                chunkMatrix.push(cur);
            }
            chunk.data[i] = chunk.data[i] / 10;
            //  this.geometry.vertices[i].z = chunk.data[i];

            cur.push(chunk.data[i]);
        }


        this._body = new CANNON.Body({
            mass: 0, // kg
            position: new CANNON.Vec3(0, 0, 0.0001), // m
            shape: new CANNON.Heightfield(chunkMatrix, {
                elementSize: 1 // Distance between the data points in X and Y directions
            })
        });


        this._mesh = s2m(this._body, new THREE.MeshLambertMaterial({
            color: 0x4286f4
        }));
        // this.body.position.set(-chunk.width * this.body.elementSize, -chunk.width * this.body.elementSize, 0);

        this.width = chunk.width;
        this.height = chunk.height;


        //  this.position.copy(this.body.position);
        // this.quaternion.copy(this.body.quaternion);

    }

    get body() {
        return this._body;
    }

    get mesh() {
        return this._mesh;
    }
}
module.exports = HeightMap;