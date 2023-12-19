import * as THREE from 'three';

function createCamera(container){
    const WIDTH = container.clientWidth;
    const HEIGHT = container.clientHeight;
    
    const camera = new THREE.PerspectiveCamera(50, WIDTH/HEIGHT, 1, 10000);

    // positioning camera
    camera.position.set(0,200,640);
    
    return camera;
}

export { createCamera };