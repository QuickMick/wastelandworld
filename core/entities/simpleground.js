const Entity = require('./entity');
const THREE = require('three');
const CANNON = require('cannon');
const s2m = require('./../util/shapetomesh');
class SimpleGround extends Entity {
  constructor() {
    super(...arguments);

  }

  init(context) {

    // Create a plane
    var groundShape = new CANNON.Plane();
    this._body = new CANNON.Body({
      material: context.assets.material.rough,
      mass: 0
    });
    this._body.addShape(groundShape);
    this._body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), -Math.PI / 2);


    // floor
    // const geometry = new THREE.PlaneGeometry(300, 300, 50, 50);
    // //  geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

    // const material = new THREE.MeshLambertMaterial({
    //   color: 0xdddddd
    // });

    // this._mesh = new THREE.Mesh(geometry, material);

    this._mesh = s2m(this._body, new THREE.MeshLambertMaterial({
      color: 0xdddddd
    }));
    this._mesh.castShadow = true;
    this._mesh.receiveShadow = true;

    super.init(context);
  }

  get body() {
    return this._body;
  }

  get mesh() {
    return this._mesh;
  }
}

module.exports = SimpleGround;