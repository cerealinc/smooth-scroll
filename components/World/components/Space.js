import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

function createSpace() {
  const geometry = new THREE.SphereGeometry(900, 32, 32);
  const space_texture = textureLoader.load(
  );

  const material = new THREE.MeshBasicMaterial({
    map: space_texture,
    side: THREE.BackSide,
  });

  const space = new THREE.Mesh(geometry, material);

  return space;
}

export { createSpace };
