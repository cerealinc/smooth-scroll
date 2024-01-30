import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

class TextWorld {
  constructor(container) {
    // Create camera
    this.camera = new THREE.OrthographicCamera(
      -1, 1, 1, -1, 0.1, 100
    );
    this.camera.position.set(0, 0, 1);

    // Create scene
    this.scene = new THREE.Scene();

    // Create WebGL renderer with transparent background
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);
    container.appendChild(this.renderer.domElement);

    // Create CSS2D renderer
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';
    container.appendChild(this.labelRenderer.domElement);

    // Add text to the scene
    this.addTextToScene();

    // Start the animation loop
    this.start();
  }

  addTextToScene() {
    // Create div elements for each line of text
    const textLine1 = document.createElement('div');
    textLine1.className = 'text-line';
    textLine1.textContent = 'A right hand to strategy, our team is both innovative and insightful,';

    const textLine2 = document.createElement('div');
    textLine2.className = 'text-line';
    textLine2.textContent = 'offering end to end solutions that streamline and maximize clients vision, resources, and impact';

    // Create a container div to hold both lines
    const textContainer = document.createElement('div');
    textContainer.className = 'text-container';
    textContainer.appendChild(textLine1);
    textContainer.appendChild(textLine2);

    // Create a CSS2DObject and add it to the scene
    const textLabel = new CSS2DObject(textContainer);
    textLabel.position.set(0, 0, 0);
    this.scene.add(textLabel);

    // Attach a mousemove event listener to the container
    this.labelRenderer.domElement.addEventListener('mousemove', this.handleMouseMove.bind(this));

    // Store references to the text lines and initialize target positions
    this.textLines = textContainer.getElementsByClassName('text-line');
    this.targetPositions = Array.from(this.textLines).map(() => 0); // Initialize target positions to 0
  }

  handleMouseMove(event) {
    // Calculate a value based on mouse position
    const percent = (event.clientX / window.innerWidth) - 0.5; // Range [-0.5, 0.5]

    // Store the target positions for each line based on the mouse position
    Array.from(this.textLines).forEach((line, index) => {
      const direction = index % 2 === 0 ? -1 : 1; // Alternate direction for each line
      this.targetPositions[index] = percent * direction * 200; // Max movement in pixels
    });
  }

  render() {
    // Apply easing and update the position of each line
    Array.from(this.textLines).forEach((line, index) => {
      const currentX = parseFloat(line.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
      const newX = currentX + (this.targetPositions[index] - currentX) * 0.1; // Smoother easing factor

      line.style.transform = `translateX(${newX}px)`;
    });

    // Render the scene
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.render();
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }
}

export { TextWorld };
