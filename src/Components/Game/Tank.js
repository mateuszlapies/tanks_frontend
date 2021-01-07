import {Axis, SceneLoader, Space, UniversalCamera, Vector3} from "@babylonjs/core";

export default class Tank {
    //private static
    static #maxSpeed = 60; //km / h
    static #minSpeed = -15; //km / h
    static #acceleration = 0.001;
    static #breaking = 0.0025;
    static #tracksDistance = 2;
    static #cameraPositionOffset = new Vector3(0, 8, 2.5);
    static #modelRotationOffset = new Vector3(0, -1.57, 0);

    //private
    #camera;
    #model;
    #scene;
    #engine;
    #frame = false;

    #currentSpeed = {l: 0, r: 0};

    //public
    position = Vector3.Zero();
    rotation = Vector3.Zero();

    constructor(scene) {
        this.#scene = scene;
        this.#engine = scene.getEngine();
        this.#camera = new UniversalCamera("player", Tank.#cameraPositionOffset, scene);
        SceneLoader.ImportMesh(null, window.location.origin + "/models/", "scene.gltf", scene, (meshes) => {
            this.#model = meshes[0];
            this.#model.rotation = Tank.#modelRotationOffset;
            this.#camera.parent = this.#model;
        });
        this.onKeyDown = this.onKeyDown.bind(this);
        this.getElapsedTime = this.getElapsedTime.bind(this);
        window.addEventListener("keydown", this.onKeyDown);
    }

    onKeyDown(e) {
        if(this.#frame) return;
        this.#frame = true;
        switch(e.key) {
            case "w": {
                if(this.#currentSpeed.l <= Tank.#maxSpeed)
                    this.#currentSpeed.l +=
                        this.#currentSpeed.l + Tank.#maxSpeed * Tank.#acceleration <= Tank.#maxSpeed ?
                            Tank.#maxSpeed * Tank.#acceleration : Tank.#maxSpeed;
                if(this.#currentSpeed.r <= Tank.#maxSpeed)
                    this.#currentSpeed.r +=
                        this.#currentSpeed.r + Tank.#maxSpeed * Tank.#acceleration <= Tank.#maxSpeed ?
                            Tank.#maxSpeed * Tank.#acceleration : Tank.#maxSpeed;
                break;
            }

            default:
            case "s": {
                if(this.#currentSpeed.l >= Tank.#minSpeed)
                    this.#currentSpeed.l -=
                        this.#currentSpeed.l - Tank.#maxSpeed * Tank.#breaking >= Tank.#minSpeed ?
                            Tank.#maxSpeed * Tank.#breaking : Tank.#minSpeed;
                if(this.#currentSpeed.r >= Tank.#minSpeed)
                    this.#currentSpeed.r -=
                        this.#currentSpeed.r - Tank.#maxSpeed * Tank.#breaking >= Tank.#minSpeed ?
                            Tank.#maxSpeed * Tank.#breaking : Tank.#minSpeed;
                break;
            }

            case "a": {
                if(this.#currentSpeed.l >= 0)
                    this.#currentSpeed.l -=
                        this.#currentSpeed.l - Tank.#maxSpeed * Tank.#breaking >= 0 ?
                            Tank.#maxSpeed * Tank.#breaking : 0;
                if(this.#currentSpeed.r <= Tank.#maxSpeed)
                    this.#currentSpeed.r +=
                        this.#currentSpeed.r + Tank.#maxSpeed * Tank.#acceleration <= Tank.#maxSpeed ?
                            Tank.#maxSpeed * Tank.#acceleration : Tank.#maxSpeed;
                break;
            }

            case "d": {
                if(this.#currentSpeed.l <= Tank.#maxSpeed)
                    this.#currentSpeed.l +=
                        this.#currentSpeed.l + Tank.#maxSpeed * Tank.#acceleration <= Tank.#maxSpeed ?
                            Tank.#maxSpeed * Tank.#acceleration : Tank.#maxSpeed;
                if(this.#currentSpeed.r >= 0)
                    this.#currentSpeed.r -=
                        this.#currentSpeed.r - Tank.#maxSpeed * Tank.#breaking >= 0 ?
                            Tank.#maxSpeed * Tank.#breaking : 0;
                break;
            }

            case " ": {
                if(this.#currentSpeed.l >= 0)
                    this.#currentSpeed.l -=
                        this.#currentSpeed.l - Tank.#maxSpeed * Tank.#breaking >= 0 ?
                            Tank.#maxSpeed * Tank.#breaking : 0;
                if(this.#currentSpeed.r >= 0)
                    this.#currentSpeed.r -=
                        this.#currentSpeed.r - Tank.#maxSpeed * Tank.#breaking >= 0 ?
                            Tank.#maxSpeed * Tank.#breaking : 0;
                break;
            }
        }
    }

    toMetersPerSecond(kilometersPerSecond) {
        return kilometersPerSecond / 3.6;
    }

    getElapsedTime() {
        return this.#engine.getDeltaTime() / 1000;
    }

    frame() {
        console.log(this.#currentSpeed)
        this.#frame = false;
        if(this.#model) {
            let movement = this.#currentSpeed.l * this.getElapsedTime() + this.#currentSpeed.r * this.getElapsedTime();
            let rotation = Math.atan(this.#currentSpeed.l / Tank.#tracksDistance) - Math.atan(this.#currentSpeed.r / Tank.#tracksDistance);
            this.#model.rotate(Axis.Y, rotation * 0.01, Space.LOCAL);
            this.#model.translate(Axis.X, movement, Space.LOCAL);
        }
    }
}
