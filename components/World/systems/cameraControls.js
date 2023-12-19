import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function createControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas);

    controls.enableDamping = true;
 
    // restricting zoom in and zoom out
    controls.minDistance = 140;
    controls.maxDistance = 140;

    return controls;
}

export { createControls };