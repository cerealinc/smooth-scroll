import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

import styles from './style.module.css';

const ScrollMarker = () => {
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
      { y: 0, height: '0'},
      { y: '6px', height: '60px', duration: 1,  ease: "power2.inOut" }
    );

    animation.fromTo(
      line,
      { y: '6px', height: '60px'},
      { y: '72px', height: '0', duration: 1,  ease: "power2.inOut"}
    );
    animation.fromTo(
      line,
      { y: 0, height: '0'},
      { y: 0, height: '0', delay: 2},
    );
    return () => {
      animation.kill(); // Clean up animation on unmount
    };
  }, []);

  const [isDarkSectionInView, setIsDarkSectionInView] = useState(false);

  // Create an Intersection Observer to check if the section with class .isDark is in view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.classList.contains('isDark')) {
          setIsDarkSectionInView(entry.isIntersecting);
        }
      });
    }, {
      rootMargin: '-40px',
    });

    const darkSection = document.querySelector('.isDark');
    if (darkSection) {
      observer.observe(darkSection);
    }

    return () => {
      if (darkSection) {
        observer.unobserve(darkSection);
      }
    };
  }, []);
  // ...

  // Use isDarkSectionInView to determine the text color
  const textColor = isDarkSectionInView ? 'isBlack' : 'isWhite';

  return (
    <div className={`${styles.scroll} ${styles[textColor]}`}>
      <div className={styles.scrollHeader}>Scroll</div>

        <div
          ref={lineRef}
          className={styles.scrollLine}
        ></div>
    </div>
  );
};

export default ScrollMarker;
