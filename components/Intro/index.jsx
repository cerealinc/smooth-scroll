import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './style.module.css';

const Intro = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const item = textRef.current;
    const itemWidth = item.clientWidth;


    const marqueeContent = document.querySelectorAll('.marquee-content');
    const marquee = document.querySelector('.marquee');



    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top center',
      end: 'bottom center',
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
      <div className={styles.marquee}>
      <div className={`${styles.marqueeContent} ${styles.scroll}`}>
        <div className={styles.textBlock}>Creative Direction, Development, and Execution</div>
      </div>
      <div className={`${styles.marqueeContent} ${styles.scroll}`}>
      <div className={styles.textBlock}>Creative Direction, Development, and Execution</div>
      </div>
    </div>

      </div>
    </div>
    </div>
  );
};

export default Intro;
