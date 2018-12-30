const uuidv1 = require('uuid/v1');
class Entity {
  constructor(id, classes) {
    /*
     * the id of the entity,
     * it can be named or generated (timebased)
     */
    this.id = id || uuidv1();

    this.classes = classes ? new Set([].concat(classes)) : new Set();
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