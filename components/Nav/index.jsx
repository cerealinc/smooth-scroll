import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

import styles from './style.module.css';

const Nav = ({ handleClick }) => {

  const animationRef = useRef(null);
  const underlineRefs = useRef([]);
  const [isDarkSectionInView, setIsDarkSectionInView] = useState(false);

  const manageMouseEnter = (e, index) => {
    // Create a new animation timeline
    const animation = gsap.timeline({
      repeat: -1, // Infinite repeat
    });    animation.fromTo(
      underlineRefs.current[index],
      { left: '-10%', width: '0' },
      { left: 0, width: '100%', duration: 1, ease: "power2.inOut" }
    );
    animation.fromTo(
      underlineRefs.current[index],
      { left: 0, width: '100%', duration: 1, delay: .5,  ease: "power2.inOut"},
      { left: 0, width: '100%', duration: 1, delay: .5,  ease: "power2.inOut"},
    );
    animation.fromTo(
      underlineRefs.current[index],
      { left: 0, width: '100%', duration: .5, ease: "power2.inOut" },
      { left: '110%', width: '0%', duration: 1, ease: "power2.inOut" }
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
      { left: '-10%', width: '0%', duration: .4, ease: "power2.inOut" }
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
      threshold: .3

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
        Home
        <div ref={(el) => (underlineRefs.current[0] = el)} className={styles.underline}></div>
      </Link>
      <Link onMouseEnter={(e) => manageMouseEnter(e, 1)} onMouseLeave={(e) => manageMouseLeave(e, 1)} href="">
        Work
        <div ref={(el) => (underlineRefs.current[1] = el)} className={styles.underline}></div>
      </Link>
      <Link onClick={handleClick} onMouseEnter={(e) => manageMouseEnter(e, 2)} onMouseLeave={(e) => manageMouseLeave(e, 2)} href="">
        Contact
        <div ref={(el) => (underlineRefs.current[2] = el)} className={styles.underline}></div>
      </Link>
    </div>
  );
};

export default Nav;
