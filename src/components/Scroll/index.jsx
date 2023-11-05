import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

import styles from './style.module.css';

const Scroll = () => {
  const lineRef = useRef(null);

  useEffect(() => {
    const line = lineRef.current;

    // Create a timeline for the repeating animations
    const animation = gsap.timeline({
      repeat: -1, // Infinite repeat
      yoyo: false, // Reverse the animation back and forth
    });

    // Define the animations
    animation.fromTo(
      line,
      { y: 0, height: '0' },
      { y: '6px', height: '60px', duration: 1,  ease: "power2.inOut" }
    );

    animation.fromTo(
      line,
      { y: '6px', height: '60px', delay: 2 },
      { y: '72px', height: '0', duration: 1,  ease: "power2.inOut" }
    );

    return () => {
      animation.kill(); // Clean up animation on unmount
    };
  }, []);

  return (
    <div className={styles.scroll}>
      <div className={styles.scrollHeader}>Scroll</div>

        <div
          ref={lineRef}
          style={{
            height: '60px',
            backgroundColor: 'white',
            width: '2px',
            position: "absolute",
            top: '-24px',

          }}
        ></div>
    </div>
  );
};

export default Scroll;
