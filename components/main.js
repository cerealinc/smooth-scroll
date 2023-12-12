import { World } from "./World/World.js";

import { useEffect } from 'react';

export default function Main() {
  useEffect(() => {
    const main = () => {
      // scene container
      const container = document.querySelector('#scene-container');

      // creating new instance of world class
      const world = new World(container);

      // starting world
      world.start();

      // locating on model
      world.findLocation(34.0549, -118.2426); // use latitude and longitudes
    };

    main();
  }, []);

  return (
    <div className="world-container">
    <div id="scene-container" className="world">
    </div>
    </div>
  );
}
