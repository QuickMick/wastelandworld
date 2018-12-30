class Entity {
  constructor() {

  }

  get body() {
    throw new Error("abstract");
  }

  get mesh() {
    throw new Error("abstract");
  }

  update(context) {

  }

  render(context) {

  }
}

module.exports = Entity;