import * as THREE from "three";

// Array to keep track of previous markers
const previousMarkers = [];

// Function to create the hovering dot marker
function createMarker() {
  const geometry = new THREE.SphereGeometry(.3, 16, 16); // Parameters: radius, widthSegments, heightSegments
  const material = new THREE.MeshStandardMaterial({
    emissive: 0xFF0000, // Yellow emissive color
    emissiveIntensity: 1, // Full intensity
    metalness: 0.5, // Adjust to your liking
    roughness: 0.5, // Adjust to your liking
  });

  const mesh = new THREE.Mesh(geometry, material);

  previousMarkers.push(mesh.uuid);

  return mesh;
}

// Function to find the position above the model
function findPosition(lat, lng, radius) {
  const R = radius + 2; // Adding a small offset to keep it above the surface
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (lng + 180) * Math.PI / 180;

  const x = -R * Math.sin(phi) * Math.cos(theta);
  const y = R * Math.cos(phi);
  const z = R * Math.sin(phi) * Math.sin(theta);

  return { x, y, z };
}



// Function to create rings around the marker
function createRings(marker) {
  const rings = new THREE.Group();

  const ringGeometry = new THREE.RingGeometry(0, 2, 64); // Parameters: innerRadius, outerRadius, segments
  const ringMaterial = new THREE.LineBasicMaterial({ color: 0xFF0000 });

  for (let i = 1; i <= 5; i++) {
    const ring = new THREE.Line(ringGeometry, ringMaterial);
    ring.scale.set(i, i, 1);
    rings.add(ring);
  }

  marker.add(rings);

  return rings;
}

// Function to mark the location with a pulsating beacon effect
function markLocation(lat, lng, earth) {
  // Check for any previously marked marker

  // Creating the marker
  const marker = createMarker();

  // Finding the position above the Earth's surface
  const position = findPosition(lat, lng, 100); // Adjust the radius to position the beacon above the Earth

  // Setting the marker position above the Earth's surface
  marker.position.set(position.x, position.y, position.z); // Adjust the Y-axis value to position the beacon above the Earth

  // Rotating the marker to face upwards
  marker.lookAt(earth.position);
  // Creating rings around the marker
  const rings = createRings(marker);

  const minScale = 0.5; // Minimum scale for the rings
  const maxScale = 0.7; // Maximum scale for the rings
  const speed = 0.003; // Speed of expansion and contraction

  let isGrowing = true; // Flag to control the scaling direction

  // Animation function for pulsating effect
  function pulsate() {
    if (isGrowing) {
      rings.scale.set(rings.scale.x + speed, rings.scale.y + speed, 1);

      if (rings.scale.x > maxScale) {
        isGrowing = false;
      }
    } else {
      rings.scale.set(rings.scale.x - speed, rings.scale.y - speed, 1);

      if (rings.scale.x < minScale) {
        isGrowing = true;
      }
    }

    requestAnimationFrame(pulsate);
  }

  // Start pulsating animation
  pulsate();

  earth.add(marker); // Adding the marker to the Earth's scene

  return marker;
}

export { markLocation };