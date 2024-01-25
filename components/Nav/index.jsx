import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import Logo from '../Logo';
import styles from './style.module.css';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';

// Register the plugin
gsap.registerPlugin(ScrollToPlugin);

const Nav = ({ handleClick, setRenderMain }) => {
  const animationRef = useRef(null);
  const underlineRefs = useRef([]);
  const [activeSection, setActiveSection] = useState(null);

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault(); // Prevent default link behavior
    handleClick(false);
  
    gsap.to(window, {
      scrollTo: { y: `#${sectionId}`, autoKill: false },
      duration: 2.6, // Adjust duration for speed (in seconds)
      ease: "power3.inOut" // Customize the easing function
    });
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
<Logo/>
<div className={styles.menu}>
        <a onClick={(e) => handleLinkClick(e, 'home')} className={activeSection === 'home' ? styles.active : styles.inActive}>
          Home
          <div ref={(el) => (underlineRefs.current[0] = el)} className={styles.underline}></div>
        </a>
        <a onClick={(e) => handleLinkClick(e, 'work')} className={activeSection === 'work' ? styles.active : styles.inActive}>
          Work
          <div ref={(el) => (underlineRefs.current[1] = el)} className={styles.underline}></div>
        </a>
        <a onClick={(e) => handleLinkClick(e, 'contact')} className={activeSection === 'contact' ? styles.active : styles.inActive}>
          Contact
          <div ref={(el) => (underlineRefs.current[2] = el)} className={styles.underline}></div>
        </a>
      </div>

    </div>
  );
};

export default Nav;
