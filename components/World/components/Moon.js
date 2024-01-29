import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

function createMoon() {
  const geometry = new THREE.SphereGeometry(64, 32, 32);
  const moon_texture = textureLoader.load(
    "/assets/textures/moon/moon_texture.jpg"
  );

  const material = new THREE.MeshPhongMaterial({
    map: moon_texture,
  });

  const moon = new THREE.Mesh(geometry, material);
  moon.position.set(window.innerWidth, -540, -2950);
console.log(moon.position);
console.log(window.innerWidth / 8);
  moon.tick = (delta) => {
    moon.rotation.y += (1 / 10) * delta;
  };

  return moon;
}

export { createMoon };
