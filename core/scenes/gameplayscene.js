const THREE = require('three');

window.THREE = THREE;
const CANNON = require('cannon');
const BaseScene = require('./../basescene');
const HeightMap = require('../entities/heightmap');
const SimpleGround = require('./../entities/simpleground');

const KEY_MAPPING = require('./../config/keymapping.json');

const Player = require('./../entities/player');
const Obstacle = require('./../entities/obstacle');
const EntityManager = require('./../entities/entitymanager');

var ColladaLoader = require('three-collada-loader-2');

const MATERIAL = require('./../../content/materials.json');

const Terrain = require('./../map/terrraingenerator');

const TTerrain = require('three.terrain.js');


var xS = 63,
    yS = 63;
const terrainScene = THREE.Terrain({
    easing: THREE.Terrain.Linear,
    frequency: 2.5,
    heightmap: THREE.Terrain.DiamondSquare,
    material: new THREE.MeshBasicMaterial({
        color: 0x5566aa
    }),
    maxHeight: 5,
    minHeight: 0,
    steps: 1,
    useBufferGeometry: false,
    xSegments: xS,
    xSize: 128,
    ySegments: yS,
    ySize: 128
});


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
        //https://www.npmjs.com/package/terrain-generator
        const a = new Terrain(32);
        a.generate(0.5);
        let b = new Terrain(32);


        b.generate(0.5, true);
        for (let i = 0; i < a.max; i++) {
            b.set(i, 0, a.get(i, a.max));
        }
        const hm = new HeightMap({
            width: 33,
            height: 33,
            data: b.map
        });

        this.entityManager.addEntity(context, new HeightMap({
            width: 33,
            height: 33,
            data: a.map
        }));

        this.entityManager.addEntity(context, hm);

        hm._body.position.x += 32;
        hm._mesh.position.x += 32;

        //  this.entityManager.addEntity(context, new SimpleGround());
        this.entityManager.addEntity(context, new Player());
        this.entityManager.addEntity(context, new Obstacle({
            type: "box",
            mass: 3,
            size: 0.5
        }));

        this.entityManager.addEntity(context, new Obstacle({
            type: "box",
            mass: 7,
            size: 0.8
        }));


        //https://threejs.org/docs/#api/en/loaders/managers/LoadingManager

        var loader = new ColladaLoader();
        loader.load('./content/Untitled1.dae', (collada) => {
            this.stage.add(collada.scene);
        });


        this.stage.add(terrainScene);


        terrainScene.rotation.x += Math.PI / 2;

        terrainScene.position.z -= 10;

        debugger;
    }

    update(context) {
        this.entityManager.update(context);

        const player = this.entityManager.get("PLAYER");
        this._camera.position.copy(player.body.position);
        this._camera.position.z += 6;

        //    this._camera.rotation.x = Math.PI / 7;
        this.pointLight.position.copy(player.body.position);
        this.pointLight.position.z += 13;
    }

    render(context) {
        this.entityManager.render(context);
    }

    cleanUp(context) {

    }
}

module.exports = GameplayScene;