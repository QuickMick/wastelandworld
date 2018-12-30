const CANNON = require('cannon');
const THREE = require('three');
const Entity = require('./entity');

class Player extends Entity {
  constructor() {
    super("PLAYER", "PLAYER");
    var radius = 1; // m
    this._body = new CANNON.Body({
      mass: 1, // kg
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

    const speed = 0.1 * context.delta;
    const m = context.inputManager.mapping;
    if (m.UP.isDown) this.body.velocity.y += speed;
    if (m.DOWN.isDown) this.body.velocity.y -= speed;
    if (m.LEFT.isDown) this.body.velocity.x -= speed;
    if (m.RIGHT.isDown) this.body.velocity.x += speed;
    if (m.JUMP.wasReleased) this.body.applyForce(new CANNON.Vec3(0, 0, 5), this.body.position);
    //  if (m.RIGHT.wasReleased) this.body.velocity.y += 0.005;
  }

  render(context) {
    super.render(context);
  }
}

module.exports = Player;