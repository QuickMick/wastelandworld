const CANNON = require('cannon');
const THREE = require('three');
const Entity = require('./entity');
const s2m = require('./../util/shapetomesh');
class Player extends Entity {
  constructor() {
    super("PLAYER", "PLAYER");

    this.attributes = {
      speed: 22
    };
  }
  //https://github.com/schteppe/cannon.js/issues/297
  init(context) {
    super.init(context);
    var size = 1; // m
    this._body = new CANNON.Body({
      mass: 5, // kg
      material: context.assets.material.rough,
      position: new CANNON.Vec3(0, 0, 10), // m
      shape: new CANNON.Sphere(size) //new CANNON.Box(new CANNON.Vec3(size, size, size)) //
    });

    // var geometry = new THREE.SphereGeometry(0.5, 32, 32);
    // var material = new THREE.MeshBasicMaterial({
    //   color: 0x00ff00
    // });
    // this._mesh = new THREE.Mesh(geometry, material);

    this._mesh = s2m(this._body, new THREE.MeshLambertMaterial({
      color: 0x00ff00
    }));
  }

  get body() {
    return this._body;
  }

  get mesh() {
    return this._mesh;
  }

  update(context) {

    const speed = this.attributes.speed * context.delta;
    const m = context.inputManager.mapping;
    if (m.UP.isDown) this.body.velocity.y += speed;
    if (m.DOWN.isDown) this.body.velocity.y -= speed;
    if (m.LEFT.isDown) this.body.velocity.x -= speed;
    if (m.RIGHT.isDown) this.body.velocity.x += speed;
    // else {
    //   this.body.velocity.x *= 0.6;
    //   this.body.velocity.y *= 0.6;
    //   //  this.body.velocity.z *= 0.6;
    // }

    // if (m.JUMP.wasReleased) this.body.applyForce(new CANNON.Vec3(0, 0, 20), this.body.position);
    if (m.JUMP.wasPressed) this.body.velocity.z += 20;
  }

  render(context) {
    super.render(context);
  }
}

module.exports = Player;