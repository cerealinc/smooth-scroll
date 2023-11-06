import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

import styles from './style.module.css';

const Nav = () => {
  const animationRef = useRef(null);
  const underlineRefs = useRef([]);
  const [isDarkSectionInView, setIsDarkSectionInView] = useState(false);

  const manageMouseEnter = (e, index) => {
    // Create a new animation timeline
    const animation = gsap.timeline({
      repeat: -1, // Infinite repeat
    });    animation.fromTo(
      underlineRefs.current[index],
      { left: 0, width: '0' },
      { left: '10%', width: '90%', duration: 1, ease: "power2.inOut" }
    );
    animation.fromTo(
      underlineRefs.current[index],
      { left: '10%', width: '90%', delay: 2 },
      { left: '100%', width: '0%', duration: 1, ease: "power2.inOut" }
    );

    // Store the animation in the animationRef
    animationRef.current = animation;
  };

  const manageMouseLeave = (e, index) => {
    if (animationRef.current) {
      animationRef.current.pause(); // Pause the animation
      animationRef.current.kill();  // Clear the animation
    }

    // Create a new animation timeline to return the underline to its original position
    const animationLeave = gsap.timeline();
    animationLeave.to(
      underlineRefs.current[index],
      { left: 0, width: '100%', duration: .4, ease: "power2.inOut" }
    );
  };
  // Create an Intersection Observer to check if the section with class .isDark is in view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.classList.contains('isDark')) {
          setIsDarkSectionInView(entry.isIntersecting);
        }
      });
    }, {
      threshold: .28

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
    <div className={`${styles.navigation} ${styles[textColor]}`}>
      <Link onMouseEnter={(e) => manageMouseEnter(e, 0)} onMouseLeave={(e) => manageMouseLeave(e, 0)} href="">
        Contact
        <div ref={(el) => (underlineRefs.current[0] = el)} className={styles.underline}></div>
      </Link>
      <span className={styles.centerLine}></span>
      <Link onMouseEnter={(e) => manageMouseEnter(e, 1)} onMouseLeave={(e) => manageMouseLeave(e, 1)} href="">
        Home
        <div ref={(el) => (underlineRefs.current[1] = el)} className={styles.underline}></div>
      </Link>
    </div>
  );
};

export default Nav;
