import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function createControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas);

    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.17;
    controls.rotateSpeed = 0.27;

    return controls;
}

export { createControls };