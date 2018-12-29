const THREE = require('three');


class BaseScene extends THREE.Scene {
    constructor() {
        super(...arguments);

        this._camera = null;
    }

    get camera() {
        return this._camera;
    }

    init(context) {}

    resume(context) {

    }

    update(context) {
        throw new Error("abstract");
    }

    render(context) {
        throw new Error("abstract");
    }

    pause(context) {

    }

    cleanUp(context) {}
}

module.exports = BaseScene;