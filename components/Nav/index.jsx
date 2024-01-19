import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

import styles from './style.module.css';

const Nav = ({ handleClick, setRenderMain }) => {
  const animationRef = useRef(null);
  const underlineRefs = useRef([]);
  const [activeSection, setActiveSection] = useState(null);

  const handleLinkClick = () => {
    handleClick(false);
  };

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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, {
      threshold: 0.1, // Adjust the threshold based on your needs
    });

    const sections = document.querySelectorAll('.section'); // Add 'section' class to your sections
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className={styles.navigation}>
<Link
  onClick={handleLinkClick}
  onMouseEnter={(e) => manageMouseEnter(e, 0)}
  onMouseLeave={(e) => manageMouseLeave(e, 0)}
  href="#home"
  className={activeSection === 'home' ? styles.active : styles.inActive}
>
  Home
  <div ref={(el) => (underlineRefs.current[0] = el)} className={styles.underline}></div>
</Link>

<Link
  onClick={handleLinkClick}
  onMouseEnter={(e) => manageMouseEnter(e, 1)}
  onMouseLeave={(e) => manageMouseLeave(e, 1)}
  href="#work"
  className={activeSection === 'work' ? styles.active : styles.inActive }
>
  Work
  <div ref={(el) => (underlineRefs.current[1] = el)} className={styles.underline}></div>
</Link>

<Link
  onClick={() => handleClick(true)}
  onMouseEnter={(e) => manageMouseEnter(e, 2)}
  onMouseLeave={(e) => manageMouseLeave(e, 2)}
  href="#contact"
  className={activeSection === 'contact' ? styles.active : styles.inActive}
>
  Contact
  <div ref={(el) => (underlineRefs.current[2] = el)} className={styles.underline}></div>
</Link>

    </div>
  );
};

export default Nav;
