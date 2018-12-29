const THREE = require('three');
const BaseScene = require('./../basescene');

const HeightMap = require('./../map/heightmap');

const InputManager = require('./../util/inputmanager');

const KEY_MAPPING = require('./../config/keymapping.json');

var mesh;


class GameplayScene extends BaseScene {
    constructor() {
        super();
        this._camera = null;

        this.inputHandler = null;
    }

    init(context) {
        // var geometry = new THREE.PlaneGeometry(50, 0.5, 0.5);
        // var material = new THREE.MeshBasicMaterial({
        //     color: 0xffff00,
        //     side: THREE.DoubleSide
        // });
        // var plane = new THREE.Mesh(geometry, material);
        // this.add(plane);

        // geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        // material = new THREE.MeshNormalMaterial();
        // mesh = new THREE.Mesh(geometry, material);

        this.inputManager = new InputManager();
        this.inputManager.loadMapping(KEY_MAPPING);
        this._camera = new THREE.PerspectiveCamera(500, context.width / context.height, 0.01, 10);
        this._camera.position.z = 1;

        //  this.add(mesh);
        this.add(new HeightMap());

        const pointLight = new THREE.PointLight(0xFFFFFF);

        // set its position
        pointLight.position.x = 0;
        pointLight.position.y = 1;
        pointLight.position.z = 0;

        // add to the scene
        this.add(pointLight);

    }

    update(context) {
        // mesh.rotation.x += 0.01;
        // mesh.rotation.y += 0.02;

        console.log(context.delta);
        const speed = 0.01 * context.delta;

        const m = this.inputManager.mapping;

        if (m.UP.isDown) this._camera.position.y += speed;
        if (m.DOWN.isDown) this._camera.position.y -= speed;
        if (m.LEFT.isDown) this._camera.position.x += speed;
        if (m.RIGHT.isDown) this._camera.position.x -= speed;

    }

    render(context) {

    }

    cleanUp(context) {

    }
}

module.exports = GameplayScene;