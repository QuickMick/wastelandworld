const THREE = require('three');
const CANNON = require('cannon');

/**
 * creates the materials and adds them to the world
 *
 * @param {World} world the physics world
 * @param {Object} materials the materials object, containing all materials and conctacts
 * @returns {Object} an object containing all materials
 */
function applyMaterials(world, materials) {
  const result = {};
  for (let mat of materials.materials) {
    const k = Object.keys(mat).length;

    result[mat.name] = new CANNON.Material(k > 1 ? mat : mat.name);
  }

  for (let m of materials.contacts) {
    const contactMaterial = new CANNON.ContactMaterial(
      result[m.between[0]],
      result[m.between[1]],
      m.behaviour
    );
    world.addContactMaterial(contactMaterial);
  }
  return result;
}

class EntityManager {
  constructor(stage, options) {
    this.stage = stage;
    this.world = null;

    this.entities = new Map();
    this.options = options;

    /*
     * Contains all usable materials
     */
    this.material = {};
  }



  init(context) {
    this.world = new CANNON.World();
    this.world.broadphase = new CANNON.NaiveBroadphase();
    this.world.gravity.set(0, 0, -9.82);
    this.material = applyMaterials(this.world, this.options.material);
    // add the loaded materials to the context
    context.assets.material = this.material;


    this.world.addEventListener("beginContact", (evt) => {
      console.log(evt);
    });

    this.world.addEventListener("endContact", (evt) => {
      console.log(evt);
    });

    this.world.addEventListener("postStep", (evt) => {
      /* for (var i = 0; i < world.contacts.length; i++) {
         var c = world.contacts[i];
         if ((c.bi === bodyA && c.bj === bodyB) || (c.bi === bodyB && c.bj === bodyA)) {
           return true;
         }
       }
       return false;*/
    });
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

  addEntity(context, entity) {
    entity.init(context);
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