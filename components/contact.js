import { World } from "./World/World.js";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './Main.module.css'; // Import your CSS module
import * as THREE from 'three';
import { zoomIn } from "./World/components/Camera.js";

export default function Contact() {
  const [fadeIn, setFadeIn] = useState(false);
  const childWrapperRef = useRef(null);
  const WorldRef = useRef(null);
  const contactDetailsRef = useRef(null);


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  
    const contact = () => {

      const world = new World(WorldRef.current);

      // starting world
      world.start();

      // locating on model
      world.findLocation(34.05, -118.24); // Update the latitude and longitude accordingly
      setFadeIn(true);

    };
    contact();

    const contactDetailsElement = contactDetailsRef.current;
    contactDetailsElement.addEventListener('wheel', handleScroll, { passive: false });
  
    return () => {
      contactDetailsElement.removeEventListener('wheel', handleScroll);
    };

  }, []);
  

  return (
    <div ref={WorldRef} className={`world-container ${fadeIn ? styles.fadeIn : ''}`}>


      <div>

        <div ref={childWrapperRef} className="world-overlay">



          <div className="contact-wrap">
          <div className="contact-details" ref={contactDetailsRef}>
                <div className="contact-scroll">
                A right hand to strategy, our team is both innovative and insightful, offering end to end solutions that streamline and maximize clients vision, resources, and impact
              <div className="contact-info" style={{textAlign: 'left'}}>
                <h4>PRODUCTION SERVICES</h4>
                <p>135 #01 Beverlv Blvd<br />
                  Los Angeles CA, 90036<br />
                </p>
                <h4>CREATIVE SERVICES</h4>
                <p>
                Retouching<br />
                Motion<br />
                Retouching<br />
                Retouching<br />
                Retouching<br />
                Retouching<br />
                Retouching<br />
                Retouching<br />
                Retouching<br />
                Retouching<br />
                Motion<br />
                Retouching<br />
                Motion<br />
                Retouching<br />
                </p>
              </div>
              </div>
            </div>

            <div className="contact-info">
                <h4>ST. STUDIO INC</h4>
                <p>135 #01 Beverlv Blvd<br />
                  Los Angeles CA, 90036<br />
                </p>
                <h4>GENERAL</h4>
                <p>
                  310 990 0000<br />
                  <a href="mailto:00@ST.STUDIO">00@ST.STUDIO</a>
                </p>
                <h4>STUDIO MANAGER</h4>
                <p>
                Camille Waterfallen<br />
                 <a href="mailto:CW@ST.STUDIO">CW@ST.STUDIO</a>
                </p>
              </div>

          </div>


        </div>

      </div>
    </div>);
}


