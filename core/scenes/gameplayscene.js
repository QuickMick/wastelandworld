const THREE = require('three');
const CANNON = require('cannon');
const BaseScene = require('./../basescene');
const HeightMap = require('./../map/heightmap');
const InputManager = require('./../util/inputmanager');
const KEY_MAPPING = require('./../config/keymapping.json');

const Player = require('./../entities/player');


class GameplayScene extends BaseScene {
    constructor() {
        super();
        this._camera = null;

        this.inputHandler = null;

        this.world = null;

        this.player = null;
    }

    init(context) {

        //  super.init(context);
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
        context.inputManager = this.inputManager;
        this.inputManager.loadMapping(KEY_MAPPING);
        this._camera = new THREE.PerspectiveCamera(500, context.width / context.height, 0.01, 10);
        this._camera.position.z = 1;

        this.loadMap();


    }

    loadMap() {
        //  this.add(mesh);
        this.add(new HeightMap());

        const pointLight = new THREE.PointLight(0xFFFFFF);

        // set its position
        pointLight.position.x = 0;
        pointLight.position.y = 1;
        pointLight.position.z = 0;

        // add to the scene
        this.add(pointLight);


        this.world = new CANNON.World({
            gravity: new CANNON.Vec3(0, 0, -9.82) // m/s²
        });
        this.player = new Player();
        this.world.addBody(this.player.body);

        this.add(this.player.mesh);
        var groundBody = new CANNON.Body({
            mass: 0 // mass == 0 makes the body static
        });
        var groundShape = new CANNON.Plane();
        groundBody.addShape(groundShape);
        this.world.addBody(groundBody);

    }

    update(context) {

        // mesh.rotation.x += 0.01;
        // mesh.rotation.y += 0.02;
        this._camera.rotation.x = -Math.PI / 8;


        this.player.update(context);
        // this.world.step(context.fixedTimeStep, context.delta, 3);

        console.log(this._camera.position);
        this._camera.position.x = this.player.body.position.x;
        this._camera.position.y = this.player.body.position.y;
        this._camera.position.z = this.player.body.position.z;

    }

    render(context) {
        this.player.render(context);
    }

    cleanUp(context) {

    }
}

module.exports = GameplayScene;