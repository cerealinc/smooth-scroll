import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './style.module.css';

const Intro = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const childWrapperRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Create ScrollTrigger with onEnter and onLeaveBack functions for the outer wrapper
    ScrollTrigger.create({
      trigger: childWrapperRef.current,
      start: 'top top',
      end: 'bottom top',
      pin: false, // Pin the outer wrapper
      pinSpacing: false, // Adjust pinSpacing based on your layout needs
      markers: false,
      onUpdate: (self) => {
        const blurAmount = 20 - self.progress * 20;
        const scroll = self.progress * 560; // Adjust the factor based on your needs
        gsap.set(textRef.current, { opacity: 1, marginTop: `-${scroll}px` });
        // gsap.set(childWrapperRef.current, {height: `${scroll}vh` });
      },
      onLeaveBack: (self) => {
        gsap.set(textRef.current, { opacity: 1, marginTop: `0px` });

      }
    });
    // Create a ScrollTrigger to control the video blur effect
    gsap.to(videoRef.current, {
      filter: 'blur(64px)',
      scrollTrigger: {
        trigger: videoRef.current,
        start: 'top-=100 center',
        end: 'top-=100 top',
        scrub: true,
        markers: false,
        onUpdate: (self) => {
          const blurAmount = 20 - self.progress * 20;
          gsap.set(videoRef.current, { filter: `blur(${blurAmount}px)` });
          gsap.to(textRef.current, { y: `${blurAmount}` }); // Adjust the duration for video fade
        },

      },
    });


  }, []);

  return (
    <>
    <div className={styles.wrapper}>

    <div ref={containerRef} className={styles.scrollContainer}>
      <div className={styles.scrollText}>
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


<div ref={childWrapperRef} className={styles.childWrapper}>
    <div ref={textRef} className={styles.scrollText2}>
      <div className={styles.marquee}>
        <div className={`${styles.marqueeContent} ${styles.scroll}`}>
          <div className={styles.textBlock}>A partner for agencies, brands</div>
        </div>
        <div className={`${styles.marqueeContent} ${styles.scroll}`}>
          <div className={styles.textBlock}>A partner for agencies, brands</div>
        </div>
      </div>
    </div>

    <div ref={containerRef} className={styles.scrollContainer}>

      <div ref={videoRef} className={styles.scrollVideoBlur}>

        <video loop muted autoPlay playsInline className={styles.videoInner}>
          <source src="/images/ST_2020_ActiveReel_5.mp4" type="video/mp4" />
        </video>

      </div>
    </div>
  </div>
  </>
  );
};

export default Intro;
