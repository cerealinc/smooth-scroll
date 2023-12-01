

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './style.module.css';

gsap.registerPlugin(ScrollTrigger);

const TextReveal = () => {
  const textRef = React.createRef();
  const backgroundRef = React.createRef();

  React.useEffect(() => {
    const text = textRef.current;
    const background = backgroundRef.current;

    // Initially set the opacity to 0
    gsap.set(text, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: background,
        start: 'top center', // Start animation when the top of the background reaches the center of the viewport
        end: 'top+=100 center', // End animation when the bottom of the background reaches the center
        markers: false,
        scrub: 1,
        pin: true, // Pin the background for the duration of the animation
      },
    });

    tl.to(
      text,
      { opacity: 1, duration: 0.1, ease: 'power2.inOut' }
    );
  }, []);

  return (
    <div className={styles.container}>
      <div ref={backgroundRef} className={styles.background}>
        {/* Your background content */}
      </div>
      <div ref={textRef} className={styles.text}>
        Your centered and revealed text
      </div>
    </div>
  );
};

export default TextReveal;