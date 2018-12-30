const THREE = require('three');
const CANNON = require('cannon');

class EntityManager {
  constructor(stage) {
    this.stage = stage;
    this.world = null;

    this.entities = new Map();
  }

  init(context) {
    this.world = new CANNON.World();
    this.world.gravity.set(0, 0, -9.82);
    this.world.broadphase = new CANNON.NaiveBroadphase();

    var groundBody = new CANNON.Body({
      mass: 0 // mass == 0 makes the body static
    });
    var groundShape = new CANNON.Plane();
    groundBody.addShape(groundShape);
    this.world.addBody(groundBody);
  }

  update(context) {
    for (let [k, v] of this.entities) {
      v.update(context);
    }
    // update the physics
    this.world.step(context.fixedTimeStep, context.delta, 3);
  }

  render(context) {
    for (let [k, v] of this.entities) {
      v.render(context);
    }
  }

  addEntity(entity) {
    this.entities.set(entity.id, entity);
    this.world.addBody(entity.body);
    this.stage.add(entity.mesh);
  }

  /**
   * get an entity by id
   *
   * @param {String} id
   * @returns {Entity} the searched entity
   * @memberof EntityManager
   */
  get(id) {
    return this.entities.get(id);
  }
}

module.exports = EntityManager;