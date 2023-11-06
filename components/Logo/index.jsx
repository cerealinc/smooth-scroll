import React, { useEffect, useRef } from 'react';
import AnimatedLogo from '../AnimatedSection';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './style.module.css';

const Logo = () => {
  const mainRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const logoAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: ".lightbg",
        start: 'center top', // Start animation when the top of the logo hits the top of the viewport
        toggleActions: 'play none none reverse',
        markers: false,
        duration: 0,
      },
    });

    // Function to check the background color and set the logo text color accordingly
    function checkBackgroundColor() {
      const backgroundColor = getComputedStyle(document.body).backgroundColor;
      const isDarkBackground = isDarkColor(backgroundColor);

      if (isDarkBackground) {
        logoAnimation.to(mainRef.current, { color: "#fff" });
      } else {
        logoAnimation.to(mainRef.current, { color: "#000" });
      }
    }

    // Function to check if a color is dark
    function isDarkColor(color) {
      // Calculate the relative luminance of the color
      const hexColor = color.slice(1); // Remove '#' from the color
      const r = parseInt(hexColor.substr(0, 2), 16) / 255;
      const g = parseInt(hexColor.substr(2, 2), 16) / 255;
      const b = parseInt(hexColor.substr(4, 2), 16) / 255;
      const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      // You can adjust this threshold as needed
      return luminance < 0.5; // Return true for dark colors, false for light colors
    }

    // Check background color initially and whenever the viewport is scrolled
    checkBackgroundColor();
    window.addEventListener('scroll', checkBackgroundColor);

    return () => {
      window.removeEventListener('scroll', checkBackgroundColor);
    };
  }, []);

  return (
    <div className={styles.logo} ref={mainRef}>
      <Link href="" >
      ST.<AnimatedLogo text="STUDIO" />
      </Link>
    </div>
  );
};

export default Logo;
