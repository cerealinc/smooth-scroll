import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

function createMars() {
  const geometry = new THREE.SphereGeometry(62, 32, 32);
  const moon_texture = textureLoader.load(
    "/assets/textures/moon/moon.jpg"
  );

  const material = new THREE.MeshPhongMaterial({
    map: moon_texture,
  });

  const moon = new THREE.Mesh(geometry, material);
  moon.position.set(-640, -700, -1650);

  moon.tick = (delta) => {
    moon.rotation.y += (1 / 15) * delta;
  };

  return moon;
}

export { createMars };
