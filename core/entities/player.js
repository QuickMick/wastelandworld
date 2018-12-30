const CANNON = require('cannon');
const THREE = require('three');
const Entity = require('./entity');
const s2m = require('./../util/shapetomesh');

const temp = new CANNON.Vec3(0, 0, 0);

class Player extends Entity {
  constructor() {
    super("PLAYER", "PLAYER");

    this.attributes = {
      acceleration: 5,
      maxSpeed: 5
    };
  }
  //https://github.com/schteppe/cannon.js/issues/297
  init(context) {
    super.init(context);
    var size = 1; // m
    this._body = new CANNON.Body({
      mass: 5, // kg
      //  fixedRotation: true,
      //linearDamping: 0.4,
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

    const acceleration = this.attributes.acceleration * context.delta;
    const dir = new CANNON.Vec3(0, 0, 0);
    const m = context.inputManager.mapping;
    if (m.UP.isDown) dir.y += 1;
    if (m.DOWN.isDown) dir.y -= 1;
    if (m.LEFT.isDown) dir.x -= 1;
    if (m.RIGHT.isDown) dir.x += 1;

    dir.normalize();
    dir.scale(acceleration, dir);
    // else {
    //   this.body.velocity.x *= 0.6;
    //   this.body.velocity.y *= 0.6;
    //   //  this.body.velocity.z *= 0.6;
    // }

    this.body.velocity.x += dir.x;
    this.body.velocity.y += dir.y;

    temp.set(this.body.velocity.x, this.body.velocity.y, 0);

    const curSpeed = temp.length();


    if (curSpeed > this.attributes.maxSpeed) {
      const x = curSpeed / 100; /// 1 prozent
      let x2 = this.attributes.maxSpeed / x; /// wie viel prozent des hat
      x2 = (x2) / 100;
      console.log(curSpeed, x2);
      this.body.velocity.x *= x2;
      this.body.velocity.y *= x2;

      console.log("speed:", this.body.velocity.length());
    }

    // // clamp max speed
    // if (this.body.velocity.x > this.attributes.maxSpeed) {
    //   this.body.velocity.x = this.attributes.maxSpeed;
    // }
    // if (this.body.velocity.y > this.attributes.maxSpeed) {
    //   this.body.velocity.y = this.attributes.maxSpeed;
    // }

    // if (this.body.velocity.x < -this.attributes.maxSpeed) {
    //   this.body.velocity.x = -this.attributes.maxSpeed;
    // }
    // if (this.body.velocity.y < -this.attributes.maxSpeed) {
    //   this.body.velocity.y = -this.attributes.maxSpeed;
    // }

    // if (m.JUMP.wasReleased) this.body.applyForce(new CANNON.Vec3(0, 0, 20), this.body.position);
    if (m.JUMP.wasPressed) this.body.velocity.z += 5;

  }

  postStep() {

  }

  render(context) {
    super.render(context);
  }
}

module.exports = Player;