import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();


const createClouds = () => {
  let cloudLayers = new THREE.Group();

  for (let i = 0; i < 3; i++) { // Create 3 layers
    const canvasCloud = textureLoader.load("/assets/textures/earth/Clouds.png");

    const geometry = new THREE.SphereGeometry(104 + i * 0.5, 128, 128); // Slightly increase radius for each layer
    const material = new THREE.MeshPhongMaterial({
      alphaMap: canvasCloud,

      transparent: true,
      opacity: 0.6 - i * 0.1, // Decrease opacity for each layer
      depthTest: true,
    });

    const cloudMesh = new THREE.Mesh(geometry, material);
    cloudLayers.add(cloudMesh);
  }

  return cloudLayers;
};

function createMaterial() {
  const material = new THREE.MeshPhongMaterial();

  // earth map
  const earthMap = textureLoader.load(
    "/assets/textures/earth/world.topo.bathy.200401.3x5400x2700.jpg"
  );
  material.map = earthMap;

  // bump
  const earthBump = textureLoader.load(
    "/assets/textures/earth/earth_bump.jpg"
  );
  material.bumpMap = earthBump;
  material.bumpScale = 0.001;

  // specular map
  const earthSpecular = textureLoader.load(
    "/assets/textures/earth/earth_specular.png"
  );
  material.specularMap = earthSpecular;
  material.specular = new THREE.Color("grey");

  return material;
}

function createEarth() {
  const geometry = new THREE.SphereGeometry(100, 128, 128);

  const cloudMesh = createClouds();

  const material = new createMaterial();

  const earth = new THREE.Mesh(geometry, material);

  earth.add(cloudMesh);

  earth.tick = (delta) => {
    cloudMesh.rotation.y += (-.01) * delta;
    earth.rotation.y += (1 / 28) * delta;
  };

  return earth;
}

export { createEarth };
