import React, {Component} from "react";
import {Engine, Model, Scene} from "react-babylonjs";
import {MeshBuilder, SceneLoader, UniversalCamera, Vector3} from '@babylonjs/core';
import Tank from "../Components/Game/Tank";

class Game extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            engine: null
        }
        this.onSceneMount = this.onSceneMount.bind(this);
    }

    meshPicked(mesh) {
        console.log('mesh picked:', mesh)
    }

    onSceneMount(e) {
        const { canvas, scene } = e;
        //let box = MeshBuilder.CreateBox('box', { size: 3}, scene);
        //box.position = new Vector3(0, 7, 10)
        let player = new Tank(scene);
        let engine = scene.getEngine();
        document.getElementById("game").addEventListener('resize', function() {
            engine.resize();
        });
        engine.runRenderLoop(() => {
            if (scene) {
                scene.render();
                player.frame();
            }
        });
    }

    render() {
        return (
            <Engine canvasId="game">
                <Scene onMeshPicked={this.meshPicked} onSceneMount={this.onSceneMount}>
                    <hemisphericLight name="light1" direction={Vector3.Up()} />
                </Scene>
            </Engine>
        )
    }
}

export default Game;
