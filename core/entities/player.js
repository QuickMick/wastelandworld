const CANNON = require('cannon');
const THREE = require('three');
const Entity = require('./entity');

class Player extends Entity {
  constructor() {
    super();
    var radius = 1; // m
    this._body = new CANNON.Body({
      mass: 5, // kg
      position: new CANNON.Vec3(0, 0, 10), // m
      shape: new CANNON.Sphere(radius)
    });

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({
      color: 0x00ff00
    });
    this._mesh = new THREE.Mesh(geometry, material);
  }

  get body() {
    return this._body;
  }

  get mesh() {
    return this._mesh;
  }

  update(context) {

    const speed = 0.001 * context.delta;
    const m = context.inputManager.mapping;
    if (m.UP.isDown) this.body.velocity.z += speed;
    if (m.DOWN.isDown) this.body.velocity.z -= speed;
    if (m.LEFT.isDown) this.body.velocity.x += speed;
    if (m.RIGHT.isDown) this.body.velocity.x -= speed;
  }

  render(context) {

    const p = this.mesh.position;
    p.x = this._body.position.x;
    p.y = this._body.position.y;
    p.z = this._body.position.z;
  }
}

module.exports = Player;