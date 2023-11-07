import React, { useEffect, useRef, useState } from 'react';
import AnimatedLogo from '../AnimatedSection';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './style.module.css';

const Logo = () => {
  const mainRef = useRef(null);
  const [isDarkSectionInView, setIsDarkSectionInView] = useState(false);

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
    <div className={`${styles.logo} ${styles[textColor]}`} ref={mainRef}>
      <Link href="" >
      ST.<AnimatedLogo text="STUDIO" />
      </Link>
    </div>
  );
};

export default Logo;
