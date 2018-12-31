const uuidv1 = require('uuid/v1');
class Entity {
  constructor(classes, id) {
    /*
     * the id of the entity,
     * it can be named or generated (timebased)
     */
    this.id = id || uuidv1();

    this.initialized = false;

    this.classes = classes ? new Set([].concat(classes)) : new Set();
  }

  /**
   * override this to initialize the element.
   * the supermethod must be called AT THE END of the inherited init-metehod
   *
   * @param {Context} context
   * @memberof Entity
   */
  init(context) {
    this.initialized = true;
    this.mesh.name = this.id;

    this.body.entity = this;
    this.mesh.entity = this;
  }


  get body() {
    throw new Error("abstract");
  }

  get mesh() {
    throw new Error("abstract");
  }

  get position() {
    return this.body.mesh.position;
  }

  update(context) {

  }

  render(context) {
    this.mesh.position.copy(this.body.position);
    this.mesh.quaternion.copy(this.body.quaternion);
  }
}

module.exports = Entity;