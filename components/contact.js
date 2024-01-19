import { World } from "./World/World.js";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './Main.module.css'; // Import your CSS module

export default function Contact() {
  const [fadeIn, setFadeIn] = useState(false);
  const childWrapperRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: childWrapperRef.current,
      start: 'top center',
      pin: true, // Pin the outer wrapper
      pinSpacing: false, // Adjust pinSpacing based on your layout needs
      markers: false,
      end: 'bottom bottom', // Pin ends when the bottom of projectWrapperRefOuter reaches the bottom of the viewport
    });
    const contact = () => {
      // scene container
      const container = document.querySelector('#scene-container');

      // creating new instance of world class
      const world = new World(container);

      // starting world
      world.start();

      // locating on model
      world.findLocation(34.05, -118.24); // Update the latitude and longitude accordingly
      setFadeIn(true);

    };

    contact();
  }, []);

  return (
    <div className={`world-container ${fadeIn ? styles.fadeIn : ''}`}>
      <div id="scene-container" className="world">
      </div>

      <div>

        <div ref={childWrapperRef} className="world-overlay">



          <div className="contact-wrap">
            <div>
            <div className="contact-details">
              A right hand to strategy, our team is both innovative and insightful, offering end to end solutions that streamline and maximize clients vision, resources, and impact
            </div>
            <div className="contact-info">
    ST. STUDIO INC<br/>
    <span>135 #01 Beverlv Blvd<br/>
Los Angeles CA, 90036<br/>
</span><br/>
GENERAL<br/>
<span>
310 990 0000<br/>
00@ST.STUDIO
<br/>
</span><br/>
STUDIO MANAGER<br/>
<span>
Camille Waterfallen<br/>
CW@ST.STUDIO
</span>
</div>
</div>
            <div className="contact-info">
              ST. STUDIO INC<br />
              <span>135 #01 Beverlv Blvd<br />
                Los Angeles CA, 90036<br />
              </span><br />
              GENERAL<br />
              <span>
                310 990 0000<br />
                00@ST.STUDIO
                <br />
              </span><br />
              STUDIO MANAGER<br />
              <span>
                Camille Waterfallen<br />
                CW@ST.STUDIO
              </span>
            </div>

          </div>


        </div>

      </div>
    </div>);
}


