

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const TextScrollAuto = () => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const marqueeWidth = marquee.scrollWidth;
    const containerWidth = marquee.parentElement.offsetWidth;

    // Calculate the duration based on the width of the content and container
    const duration = marqueeWidth; // Adjust as needed

    // Create a GSAP timeline to animate the marquee
    const marqueeAnimation = gsap.to(marquee, {
      x: -marqueeWidth,
      duration: duration,
      repeat: -1,
      ease: 'linear',
    });

    return () => {
      // Clean up animation on unmount
      marqueeAnimation.kill();
    };
  }, []);

  return (
    <div className="marquee-container">
      <div className="marquee" ref={marqueeRef}>
        Creative Direction, Development, and Execution
      </div>
    </div>
  );
};

export default TextScrollAuto;
