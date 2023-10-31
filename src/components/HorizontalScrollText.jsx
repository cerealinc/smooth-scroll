import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HorizontalScrollText = () => {
  const textRef = useRef(null);

  useEffect(() => {
    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Create a timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top+=40 center', // Add a 200px buffer above the start marker
        end: 'center+=400 center',
        pin: true,
        scrub: 1, // Adjust this value to control the animation speed
        markers: false, // Add this for debugging (remove in production)
      },
    });

    // Create an animation to scroll the text horizontally
    tl.to(textRef.current, { x: '-135%', duration: 10 });

    // Disable scroll trigger animations when navigating away from the page
    return () => {
      tl.kill();
      ScrollTrigger.getById(textRef.current).kill(true);
    };
  }, []);

  return (
    <div className='horizontal-scroll-container'>

      <div ref={textRef} className="horizontal-scroll-text">
      A creative partner for agencies, brands, and start-ups.
      </div>
      </div>
  );
};

export default HorizontalScrollText;
