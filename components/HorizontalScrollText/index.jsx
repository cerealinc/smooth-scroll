import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './style.module.css';

const HorizontalScrollText = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const item = textRef.current;
    const itemWidth = item.clientWidth;

    gsap.set(item, {
      marginLeft: '100vw', // Start off the screen to the right
    });

    const marquee = gsap.to(item, {
      duration: 39,
      ease: 'none',
      x: '-=' + (itemWidth + window.innerWidth), // Animate off the screen to the left
      repeat: -1,
      repeatRefresh: true, // Repeats animation when it reaches the end
      modifiers: {
        x: x => (parseFloat(x) % (itemWidth + window.innerWidth)) + 'px',
      },
    });


    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top center',
      end: 'bottom top',
      pin: true, // Pin the container
      pinSpacing: false, // Remove space when pinned
      markers: false, // Remove this in production
      onEnter: () => {
        gsap.to(item, { opacity: 1, duration: 1 }); // Adjust the duration for video fade
      },
      onLeaveBack: () => {
        gsap.to(item, { opacity: 0, duration: 1 }); // Adjust the duration for video fade
      },
    });
  }, []);

  return (
    <div className={styles.wrapper}>
    <div ref={containerRef} className={styles.scrollContainer}>
      <div ref={textRef} className={styles.scrollText}>
      Creative Direction, Development, and Execution
<span style={{marginLeft: "20vw"}}>Creative Direction, Development, and Execution

</span><span style={{marginLeft: "20vw"}}>Creative Direction, Development, and Execution

</span><span style={{marginLeft: "20vw"}}>Creative Direction, Development, and Execution

</span>

      </div>
    </div>
    </div>
  );
};

export default HorizontalScrollText;
