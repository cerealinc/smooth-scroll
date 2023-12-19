'use client';
import { World } from "../../components/World/World.js";

import { useEffect } from 'react';

export default function Contact() {
  useEffect(() => {
    const Contact = () => {
      // scene container
      const container = document.querySelector('#scene-container');

      // creating new instance of world class
      const world = new World(container);

      // starting world
      world.start();

      // locating on model
      world.findLocation(39.0549, -108.2426); // use latitude and longitudes
    };

    Contact();
  }, []);

  return (
    <div className="world-container">
    <div id="scene-container" className="world">
    </div>
    <div className="world-overlay">
    <div className="contact-info">
    ST. STUDIO INC<br/>
    135 #01 Beverlv Blvd<br/>
Los Angeles CA, 90036<br/><br/>
GENERAL<br/>
310 990 ****<br/>
00@ST.STUDIO
<br/><br/>
STUDIO MANAGER<br/>
Camille Waterfallen<br/>
CW@ST.STUDIO
</div>
<div className="contact-details">
A right hand to strategy, our team is both innovative and insightful, offering end to end solutions that streamline and maximize clients vision, resources, and impact
</div>

    </div>
    </div>
  );
}
