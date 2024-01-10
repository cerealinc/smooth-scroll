import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function createControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas);

    controls.enableDamping = true;
    controls.minDistance = 180;
    controls.maxDistance = 1340;

    return controls;
}
function createCamera(container){
    const WIDTH = container.clientWidth;
    const HEIGHT = container.clientHeight;
    
    const camera = new THREE.PerspectiveCamera(50, WIDTH/HEIGHT, 1, 10000);

    // positioning camera
    camera.position.set(0,200,340);
    
    return camera;
}
function zoomIn(camera, targetPosition, renderer, scene) {
  const easingFactor = 0.05; // Adjust for animation speed

  const moveCamera = () => {
    const direction = targetPosition.clone().sub(camera.position);
    camera.position.add(direction.multiplyScalar(-easingFactor)); // Negate the delta value here

    camera.lookAt(targetPosition);
    renderer.render(scene, camera);

    if (camera.position.distanceTo(targetPosition) > 1) {
      requestAnimationFrame(moveCamera);
    }
  };

  moveCamera();
}

export { createControls, zoomIn, createCamera };
