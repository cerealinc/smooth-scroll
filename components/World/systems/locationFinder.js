import * as THREE from "three";

// Array to keep track of previous markers
const previousMarkers = [];

// Function to create the hovering dot marker
function createMarker(size = 0.3) { // Default size is 0.3
  console.log("Marker size:", size); // Add this line to log the size

  const geometry = new THREE.SphereGeometry(size, 16, 16); // Use the size parameter
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


function createRings(marker, size = 2) {
  const rings = new THREE.Group();

  // Define the gap between each ring
  const gap = 0.1;

  for (let i = 1; i <= 7; i++) { // Change this to 3 for three rings
    const innerRadius = i * size - gap; // Increment the inner radius for each ring
    const outerRadius = i * size; // Outer radius for each ring

    // Create the geometry for a ring
    const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xFF0000,
      side: THREE.DoubleSide, // Ensure the ring is visible from both sides
      transparent: true, // Enable transparency
      opacity: 0 // Make the material transparent
    });

    // We need to create an edge geometry to only show the edges of the ring
    const edges = new THREE.EdgesGeometry(ringGeometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xFF0000 }));

    rings.add(line);
  }

  marker.add(rings);

  return rings;
}



// Function to mark the location with a pulsating beacon effect
function markLocation(lat, lng, earth, size = 0.3) {
  // Check for any previously marked marker

  // Creating the marker
  const marker = createMarker(size);

  // Finding the position above the Earth's surface
  const position = findPosition(lat, lng, 100); // Adjust the radius to position the beacon above the Earth

  // Setting the marker position above the Earth's surface
  marker.position.set(position.x, position.y, position.z); // Adjust the Y-axis value to position the beacon above the Earth

  // Rotating the marker to face upwards
  marker.lookAt(earth.position);
  // Creating rings around the marker
  const rings = createRings(marker, size * 4); // Pass an adjusted size for the rings

  const baseScale = size * 10; // Base scale factor for rings
  const minScale = baseScale * 0.5; // Minimum scale for the rings
  const maxScale = baseScale * 0.7; // Maximum scale for the rings
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