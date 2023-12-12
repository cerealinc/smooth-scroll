import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function createControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas);

    controls.enableDamping = true;
 
    // restricting zoom in and zoom out
    controls.minDistance = 40;
    controls.maxDistance = 1900;

    return controls;
}

export { createControls };