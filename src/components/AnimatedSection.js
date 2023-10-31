import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const AnimatedLogo = ({ text }) => {
  const logoRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(SplitText, ScrollTrigger);

    const logoAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#nextSection",
        start: 'top top', // Start animation when the top of the logo hits the top of the viewport
        end: '+=100%', // End animation when the top of the logo is 100% off-screen
        toggleActions: 'play none none reverse',
      },
    });

    const split = new SplitText(logoRef.current, { type: 'chars' });
    const splitChars = split.chars;

    logoAnimation.to(splitChars, {
      opacity: 0,
      y: 0,
      x: -1,
      stagger: -0.02,
    });
  }, []);

  return (
    <span ref={logoRef}>
      {text}
    </span>
  );
};

export default AnimatedLogo;
