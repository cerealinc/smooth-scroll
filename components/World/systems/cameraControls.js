import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function createControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas);

    controls.enableDamping = true;
    controls.zoomSpeed = -1;
    // restricting zoom in and zoom out
    controls.minDistance = 180;
    controls.maxDistance = 1040;

    return controls;
}

export { createControls };