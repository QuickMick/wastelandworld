const THREE = require('three');
const CANNON = require('cannon');
const BaseScene = require('./../basescene');
const HeightMap = require('./../map/heightmap');
const SimpleGround = require('./../entities/simpleground');

const KEY_MAPPING = require('./../config/keymapping.json');

const Player = require('./../entities/player');

const EntityManager = require('./../entities/entitymanager');

class GameplayScene extends BaseScene {
    constructor() {
        super();
        this._camera = null;


        this.entityManager = new EntityManager(this.stage);

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


        context.inputManager.loadMapping(KEY_MAPPING);
        this._camera = new THREE.PerspectiveCamera(75, context.width / context.height, 0.1, 1000);
        this._camera.position.z = 1;

        this.loadMap(context);


    }

    loadMap(context) {
        this.entityManager.init(context);
        //  this.add(mesh);


        const pointLight = new THREE.PointLight(0xFFFFFF);

        // set its position
        pointLight.position.x = 0;
        pointLight.position.y = 1;
        pointLight.position.z = 0;


        this.stage.fog = new THREE.Fog(0x000000, 0, 500);

        var ambient = new THREE.AmbientLight(0x111111);
        this.stage.add(ambient);

        const light = new THREE.SpotLight(0xffffff);
        light.position.set(10, 30, 20);
        light.target.position.set(0, 0, 0);
        this.stage.add(light);

        // add to the scene
        this.stage.add(pointLight);
        this.stage.add(new HeightMap());

        this.entityManager.addEntity(new SimpleGround());
        this.entityManager.addEntity(new Player());




    }

    update(context) {
        this.entityManager.update(context);
        // mesh.rotation.x += 0.01;
        // mesh.rotation.y += 0.02;
        //   this._camera.rotation.x = -Math.PI / 8;


        const player = this.entityManager.get("PLAYER");
        this._camera.position.x = player.body.position.x;
        this._camera.position.y = player.body.position.y;
        this._camera.position.z = player.body.position.z + 30;

    }

    render(context) {
        this.entityManager.render(context);
    }

    cleanUp(context) {

    }
}

module.exports = GameplayScene;