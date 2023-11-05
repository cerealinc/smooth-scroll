import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const AnimatedLogo = ({ text }) => {
  const logoRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(SplitText, ScrollTrigger);

    const logoAnimationOut = gsap.timeline({
      scrollTrigger: {
        trigger: "#nextSection",
        start: 'top top', // Start animation when the top of the logo hits the top of the viewport
        end: '+=100%', // End animation when the top of the logo is 100% off-screen
        toggleActions: 'play none none reverse',
      },
    });

    const logoAnimationIn = gsap.timeline({
      scrollTrigger: {
        trigger: "#nextSection",
        start: 'top top', // Start animation when the top of the logo hits the top of the viewport
        end: '+=100%', // End animation when the top of the logo is 100% off-screen
        toggleActions: 'play none none reverse',
      },
    });

    const splitOut = new SplitText(logoRef.current, { type: 'chars' });
    const splitIn = new SplitText(logoRef.current, { type: 'chars' });
    const splitCharsOut = splitOut.chars;
    const splitCharsIn = splitIn.chars;

    logoAnimationOut.to(splitCharsOut, {
      opacity: 0,
      y: -6, // Move text down for animation out
      stagger: 0.01,
      duration: 0.7,
    });

    logoAnimationIn.from(splitCharsIn, {
      opacity: 1,
      y: 0, // Move text up for animation in
      stagger: 0.01,
      duration: 0.7,
    });
  }, []);

  return (
    <span ref={logoRef}>
      {text}
    </span>
  );
};

export default AnimatedLogo;
