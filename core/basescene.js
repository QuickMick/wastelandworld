const THREE = require('three');


class BaseScene {
    constructor() {
        this.initialized = false;
        this._camera = null;

        this.stage = new THREE.Scene();


        //The X axis is red. The Y axis is green. The Z axis is blue.
        var axesHelper = new THREE.AxesHelper(5);
        this.stage.add(axesHelper);
    }

    get camera() {
        return this._camera;
    }

    init(context) {
        this.initialized = true;
    }

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