import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
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

  const textColor = isDarkSectionInView ? 'isBlack' : 'isWhite';

  return (
    <div className={`${styles.logo} ${styles[textColor]}`} ref={mainRef}>
      <Link href="/" >
      SAINT
      </Link>
    </div>
  );
};

export default Logo;
