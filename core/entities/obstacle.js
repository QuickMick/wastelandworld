const CANNON = require('cannon');
const THREE = require('three');
const Entity = require('./entity');
const s2m = require('./../util/shapetomesh');


function createShape(options = {}) {
  const size = options.size || 1;
  const type = options.type || "box";

  switch (type) {
    case "box":
      return new CANNON.Box(new CANNON.Vec3(size, size, size));
    case "sphere":
      return new CANNON.Sphere(size / 2)
  }
}

class Obstacle extends Entity {
  constructor(options) {
    super("OBSTACLE");
    this.options = options;
  }
  //https://github.com/schteppe/cannon.js/issues/297
  init(context) {
    this._body = new CANNON.Body({
      mass: this.options.mass || 2, // kg
      material: context.assets.material.rough,
      position: new CANNON.Vec3(0, 2, 10), // m
      shape: createShape(this.options)
    });

    this._mesh = s2m(this._body, new THREE.MeshLambertMaterial({
      color: 0x00ff00
    }));

    super.init(context);
  }

  get body() {
    return this._body;
  }

  get mesh() {
    return this._mesh;
  }

  update(context) {

  }

  render(context) {
    super.render(context);
  }
}

module.exports = Obstacle;