// importing components
import { createCamera } from "./components/Camera.js";
import { createEarth } from "./components/Earth.js";
import { createScene } from "./components/Scene.js";
import { createLight } from "./components/Light.js";
import { createMoon } from "./components/Moon.js";
import { createMars } from "./components/Mars.js";
// importing systems
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/resizer.js";
import { Loop } from "./systems/animationLoop.js";
import { createControls } from "./systems/cameraControls.js";
import { markLocation } from "./systems/locationFinder.js";
import gsap from 'gsap';

let loop;
let controls;
let resizer;


class World {

  constructor(container) {
    this.allowZoom = false; // Add a flag to control zooming
    this.camera = createCamera(container);
    this.scene = createScene();
    this.earth = createEarth();
    this.moon = createMoon();
    this.mars = createMars();
    this.renderer = createRenderer();
    container.append(this.renderer.domElement);
    this.controls = createControls(this.camera, container);
    // adding moon to scene
    this.scene.add(this.moon);
    this.scene.add(this.mars);

    // adding earth to scene
    this.scene.add(this.earth);


    // adding lights to the scene
    const { mainLight, ambientLight } = createLight();
    this.scene.add(mainLight, ambientLight);

    // camera controls
    controls = createControls(this.camera, container);

    // on window resizing
    resizer = new Resizer(container, this.camera, this.renderer);

    // animation loop
    loop = new Loop(this.camera, this.scene, this.renderer);
    loop.updatables.push(this.earth, this.moon, this.mars);
  }

  calculateZoomLevel(progress) {
    const minZoom = 280;
    const maxZoom = 980;
    // Use an easing function for smoother transition
    const easedProgress = gsap.parseEase("power3.out")(progress / 5);
    const zoom = minZoom + (maxZoom - minZoom) * easedProgress;
    return { min: zoom, max: zoom };
  }

  enableZoom() {
    this.allowZoom = true;
  }

  disableZoom() {
    this.allowZoom = false;
  }

  updateZoom(progress) {
    if (this.allowZoom) {
      // Reverse the progress for zooming out
      const reversedProgress = 1 - progress;

      // Calculate the new zoom level based on reversed progress
      const zoomLevel = this.calculateZoomLevel(reversedProgress);

      // Apply the new zoom level
      this.controls.minDistance = zoomLevel.min;
      this.controls.maxDistance = zoomLevel.max;
      this.controls.update();
    }
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }

  findLocation(lat, lng, earth, size = 0.2) { // Add size parameter with default value
    const marker = markLocation(lat, lng, earth, size); // Pass size to markLocation
    earth.add(marker);
  }
}

export { World };
