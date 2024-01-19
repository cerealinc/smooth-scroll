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
  href="#home"
  className={activeSection === 'home' ? styles.active : styles.inActive}
>
  Home
  <div ref={(el) => (underlineRefs.current[0] = el)} className={styles.underline}></div>
</Link>

<Link
  onClick={handleLinkClick}
  href="#work"
  className={activeSection === 'work' ? styles.active : styles.inActive }
>
  Work
  <div ref={(el) => (underlineRefs.current[1] = el)} className={styles.underline}></div>
</Link>

<Link
  onClick={() => handleClick(true)}
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
