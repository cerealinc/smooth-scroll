import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function createControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas);
		controls.enablePan = false;
		controls.enableDamping = true;
		controls.dampingFactor = 0.17;
		controls.rotateSpeed = 0.37;


    return controls;
}
function createCamera(container){
    const WIDTH = container.clientWidth;
    const HEIGHT = container.clientHeight;
    
    const camera = new THREE.PerspectiveCamera(50, WIDTH / HEIGHT, 1, 10000);

    // Raise the camera position
    camera.position.set(0, 200, 340); // Adjust Y position to raise the camera

    // Orient the camera to look at a point below the Earth's center
    const earthPosition = new THREE.Vector3(0, -50, 0); // Adjust as needed
    camera.lookAt(earthPosition);
    
    return camera;
}


export { createControls, createCamera };
