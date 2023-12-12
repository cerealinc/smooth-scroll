import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

const createClouds = () => {
  const canvasCloud = textureLoader.load(
    "/assets/textures/earth/earth_clouds.png"
  );

  const geometry = new THREE.SphereGeometry(100.02, 128, 128); // Increased segments
  const material = new THREE.MeshPhongMaterial({
    map: canvasCloud,
    transparent: true,
    depthTest: false,
  });

  const cloudMesh = new THREE.Mesh(geometry, material);

  return cloudMesh;
};

function createMaterial() {
  const material = new THREE.MeshPhongMaterial();

  // earth map
  const earthMap = textureLoader.load(
    "/assets/textures/earth/earth_map.jpg"
  );
  material.map = earthMap;

  // bump
  const earthBump = textureLoader.load(
    "/assets/textures/earth/earth_bump.jpg"
  );
  material.bumpMap = earthBump;
  material.bumpScale = 0.005;

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
    cloudMesh.rotation.y += (-.2) * delta;
    earth.rotation.y += (1 / 28) * delta;
  };

  return earth;
}

export { createEarth };
