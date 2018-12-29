const THREE = require('three');

const OFFSET = 0;


class Game {

    constructor() {
        this.quit = false;
        this.fps = 60;
        this.then = Date.now();

        this.renderer = null;

        this.currentScene = null;

        // necessary for the context object
        const self = this;
        /**
         * object passed to all render and update-calls
         */
        this.context = {
            delta: 1,
            get camera() {
                if (!self.currentScene) return null;
                return self.currentScene.camera;
            }
        };

        /**
         * field to hold the next job for scene cahgnes
         */
        this._changeSceneJob = null;
    }

    /**
     * Starts the applications render and update cycle
     *
     * @returns
     * @memberof Game
     */
    start() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.domElement.classList = "scene";
        // prevent the context menu
        this.renderer.domElement.oncontextmenu = function (e) {
            e.preventDefault();
        };
        // add it to the document
        document.body.appendChild(this.renderer.domElement);

        // add the resize listene and call it,
        // so that the screen is initially sized correctly
        this.resize();
        window.addEventListener('resize', this.resize.bind(this), false);

        /*
         * the main application cycle
         */
        const run = () => {
            if (this.quit) return;
            requestAnimationFrame(run);
            // change the scene if necessary
            if (this._changeSceneJob) {
                this._changeSceneJob(this.context);
                this._changeSceneJob = null;
            }
            // calculate the delta time
            const now = Date.now();
            const delta = now - this.then;
            const interval = 1000 / this.fps;
            // update the scene and redner if possible
            if (delta > interval) {
                this.context.delta = delta; // update the delta in the context 
                this.update(this.context);
                this.then = now - (delta % interval);
                this.render(this.context);
            }
        };
        // start the update cycle
        run();
    }

    /**
     * updates the current scene
     *
     * @param {*} delta
     * @memberof Game
     */
    update(context) {
        this.currentScene.update(context);
    }

    /**
     * renders the current scene
     *
     * @param {*} delta
     * @memberof Game
     */
    render(context) {
        this.currentScene.render(context);
        const camera = this.context.camera;
        if (!camera) return console.error("no cam");
        this.renderer.render(this.currentScene, camera);
    }

    /**
     * resizes the canvas
     * use either event or the widht/hgiht
     * @param {Object} evt evt from the window event
     * @param {Number} width of the canvas
     * @param {Number} height of the canvas
     * @memberof Game
     */
    resize(evt, width, height) {

        const w = (width || window.innerWidth - OFFSET);
        const h = (height || window.innerHeight - OFFSET);
        this.context.width = w;
        this.context.height = h;

        const camera = this.context.camera;
        if (camera) {
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        }
        this.renderer.setSize(w, h);
    }


    /**
     * starts a new scene.
     * it is sheduled before the next game-cycle
     *
     * @param {BaseScene} scene
     * @memberof Game
     */
    setScene(scene) {
        this._changeSceneJob = (context) => {
            // if there is a old scene, stop it and clean it up
            if (this.currentScene) {
                this.currentScene.pause(context);
                this.currentScene.cleanUp(context);
            }
            // then start the new scene
            scene.init(context);
            scene.resume(context);
            this.currentScene = scene;
        }
    }
}

module.exports = Game;