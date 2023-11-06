import React, { useEffect } from 'react';
import gsap from 'gsap';

const ParallaxText = () => {
  useEffect(() => {
    // Create a GSAP timeline for parallax scrolling
    const tl = gsap.timeline();

    // Add animations for your parallax effect
    tl.to('.parallax-text', {
      y: -100, // Adjust the parallax distance as needed
      scrollTrigger: {
        trigger: '.parallax-text',
        start: 'top center',
        end: 'bottom center',
        scrub: true, // Smooth scrolling effect
      },
    });
  }, []);

  return (
    <div className="parallax-text-container">
      <h1 className="parallax-text">Parallax Text</h1>
    </div>
  );
};

export default ParallaxText;
