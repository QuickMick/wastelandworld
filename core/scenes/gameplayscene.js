const THREE = require('three');
const CANNON = require('cannon');
const BaseScene = require('./../basescene');
const HeightMap = require('../entities/heightmap');
const SimpleGround = require('./../entities/simpleground');

const KEY_MAPPING = require('./../config/keymapping.json');

const Player = require('./../entities/player');
const Obstacle = require('./../entities/obstacle');
const EntityManager = require('./../entities/entitymanager');


const MATERIAL = require('./../../content/materials.json');

class GameplayScene extends BaseScene {
    constructor() {
        super();
        this._camera = null;

        this.entityManager = new EntityManager(this.stage, {
            material: MATERIAL
        });

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


        const pointLight = new THREE.PointLight(0xFFFFFF, 1, 25);

        // set its position
        pointLight.position.x = 0;
        pointLight.position.y = 1;
        pointLight.position.z = 0;

        this.stage.add(pointLight);

        this.pointLight = pointLight;


        this.stage.fog = new THREE.Fog(0x000000, 0, 25);

        const ambient = new THREE.AmbientLight(0x111111);
        this.stage.add(ambient);

        // const light = new THREE.SpotLight(0xffffff);
        // light.position.set(10, 30, 20);
        // light.target.position.set(0, 0, 0);
        // this.stage.add(light);

        this.entityManager.addEntity(context, new HeightMap());
        this.entityManager.addEntity(context, new SimpleGround());
        this.entityManager.addEntity(context, new Player());
        this.entityManager.addEntity(context, new Obstacle({
            type: "box",
            mass: 3,
            size: 0.5
        }));
    }

    update(context) {
        this.entityManager.update(context);

        const player = this.entityManager.get("PLAYER");
        this._camera.position.copy(player.body.position);
        this._camera.position.z += 4;

        //    this._camera.rotation.x = Math.PI / 7;
        this.pointLight.position.copy(player.body.position);
        this.pointLight.position.z += 3;

    }

    render(context) {
        this.entityManager.render(context);
    }

    cleanUp(context) {

    }
}

module.exports = GameplayScene;