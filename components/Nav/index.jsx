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
  const navRef = useRef(null);
  const [isDarkSectionInView, setIsDarkSectionInView] = useState(false);

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault(); // Prevent default link behavior
    handleClick(false);

    gsap.to(window, {
      scrollTo: { y: `#${sectionId}`, autoKill: false },
      duration: 2.6, // Adjust duration for speed (in seconds)
      ease: "power3.inOut" // Customize the easing function
    });
  };

  // Create an Intersection Observer to check if the section with class .isDark is in view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log('Intersection Observer Entry Data:', entry);

        if (entry.target.classList.contains('isDark')) {
          setIsDarkSectionInView(entry.isIntersecting);
        }
      });
    }, {
      threshold: .25
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
<div className={`${styles.menu} ${styles[textColor]}`} ref={navRef}>

<a
  onClick={(e) => handleLinkClick(e, 'home')}
  className={`${styles.homeLink} ${activeSection === 'home' ? styles.active : styles.inActive}`}
>
  Home
</a>

        <a onClick={(e) => handleLinkClick(e, 'work')} className={activeSection === 'work' ? styles.active : styles.inActive}>
          Work
        </a>
        <a onClick={(e) => handleLinkClick(e, 'contact')} className={activeSection === 'contact' ? styles.active : styles.inActive}>
          Info
        </a>
        <a onClick={(e) => handleLinkClick(e, 'contactPopup')} className={activeSection === 'contactPopup' ? styles.active : styles.inActive}>
          Contact
        </a>
      </div>

    </div>
  );
};

export default Nav;
