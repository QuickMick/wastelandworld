const CANNON = require('cannon');
const THREE = require('three');
const Entity = require('./entity');
const s2m = require('./../util/shapetomesh');

const speedTemp = new CANNON.Vec3(0, 0, 0);

const dirTemp = new CANNON.Vec3(0, 0, 0);

class Player extends Entity {
  constructor() {
    super("PLAYER", "PLAYER");

    /*
     * the contacts are counted,
     * if the count is greater than zero, the entity is on ground
     */
    this._isOnGround = 0;

    this.attributes = {
      acceleration: 25,
      maxSpeed: 13
    };
  }

  /** ################ LISTENERS ############### */

  onBeginContact(context, other) {
    this._isOnGround++;
  }

  onEndContact(context, other) {
    this._isOnGround--;
  }

  /** ############### END LISTENERS ############ */


  //https://github.com/schteppe/cannon.js/issues/297
  init(context) {
    var size = 1; // m
    this._body = new CANNON.Body({
      mass: 5, // kg
      fixedRotation: true,
      //linearDamping: 0.4,
      material: context.assets.material.slippery,
      position: new CANNON.Vec3(10, 10, 10), // m
      shape: new CANNON.Sphere(size / 2) //new CANNON.Box(new CANNON.Vec3(size, size, size)) //
    });

    this._body.addEventListener('beginContact', (evt) => {
      console.log("evt", evt);
    });

    // var geometry = new THREE.SphereGeometry(0.5, 32, 32);
    // var material = new THREE.MeshBasicMaterial({
    //   color: 0x00ff00
    // });
    // this._mesh = new THREE.Mesh(geometry, material);

    this._mesh = s2m(this._body, new THREE.MeshLambertMaterial({
      color: 0x00ff00
    }));

    super.init(context);
  }

  /**
   * true, if the entity has contact to the ground
   *
   * @readonly
   * @memberof Player
   */
  get isOnGround() {
    return this._isOnGround > 0;
  }

  get body() {
    return this._body;
  }

  get mesh() {
    return this._mesh;
  }


  update(context) {
    const acceleration = this.attributes.acceleration * context.delta;
    dirTemp.set(0, 0, 0);
    const m = context.inputManager.mapping;
    if (m.UP.isDown) dirTemp.y += 1;
    if (m.DOWN.isDown) dirTemp.y -= 1;
    if (m.LEFT.isDown) dirTemp.x -= 1;
    if (m.RIGHT.isDown) dirTemp.x += 1;

    dirTemp.normalize();
    dirTemp.scale(acceleration, dirTemp);

    // apply the speed,
    // or if nothing is pressed, damp the speed fast
    if (dirTemp.length() === 0) {
      this.body.velocity.x *= 0.8;
      this.body.velocity.y *= 0.8;
    } else {
      this.body.velocity.x += dirTemp.x;
      this.body.velocity.y += dirTemp.y;
    }

    speedTemp.set(this.body.velocity.x, this.body.velocity.y, 0);
    const curSpeed = speedTemp.length();

    // if the player is to fast,
    // clamp the speed
    if (curSpeed > this.attributes.maxSpeed) {
      const onePercent = curSpeed / 100; // one percent of current speed
      let percent = this.attributes.maxSpeed / onePercent; // percent of target speed
      percent = (percent) / 100;
      // reduce the speed, so that the rations of speed still fit
      this.body.velocity.x *= percent;
      this.body.velocity.y *= percent;
    }

    if (m.JUMP.wasPressed && this.isOnGround) this.body.velocity.z += 5;

  }

  postStep() {

  }

  render(context) {
    super.render(context);
  }
}

module.exports = Player;