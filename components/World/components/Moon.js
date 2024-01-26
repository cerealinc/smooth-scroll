import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

function createMoon() {
  const geometry = new THREE.SphereGeometry(62, 32, 32);
  const moon_texture = textureLoader.load(
    "/assets/textures/moon/moon_texture.jpg"
  );

  const material = new THREE.MeshPhongMaterial({
    map: moon_texture,
  });

  const moon = new THREE.Mesh(geometry, material);
  moon.position.set(680, -730, -2950);

  moon.tick = (delta) => {
    moon.rotation.y += (1 / 10) * delta;
  };

  return moon;
}

export { createMoon };
