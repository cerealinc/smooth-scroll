import * as THREE from 'three';

function createScene(){
    const scene = new THREE.Scene();
    scene.background = null; // Set scene background to null or transparent

    return scene;
}

export { createScene };
