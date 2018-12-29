const THREE = require('three');

const data = require('./../../content/chunk.json');



const x = 10;



class HeightMap extends THREE.Mesh {
    constructor(chunk) {
        chunk = data;
        const geometry = new THREE.PlaneGeometry(chunk.width / x, chunk.height / x, chunk.width - 1, chunk.height - 1);
        const texture = THREE.ImageUtils.loadTexture('content/hightmap2.png');

        var material = new THREE.MeshLambertMaterial({

            map: texture
        });
        // var material = new THREE.MeshBasicMaterial({
        //     map: texture,
        //     side: THREE.DoubleSide
        // });

        super(geometry, material);

        for (var i = 0; i < this.geometry.vertices.length; i++) {
            this.geometry.vertices[i].z = chunk.data[i] / 100;
        }

        this.rotateX(-Math.PI / 4);

        this.width = chunk.width;
        this.height = chunk.height;

    }
}
module.exports = HeightMap;