import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import styles from './style.module.css';

gsap.registerPlugin(ScrollTrigger); // Register CSSPlugin

const HorizontalScrollText2 = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  
  useEffect(() => {

    // Your existing GSAP code for horizontal text animation and pinning
    const item = textRef.current;
    const itemWidth = item.clientWidth;
    // Parallax effect for the video
    gsap.to(item, {
      y: 0, // Adjust the vertical parallax distance
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true, // Smooth scrolling effect
        markers: false
      },
    });
    // Parallax effect for the video
    gsap.to(videoRef.current, {
      y: -260, // Adjust the vertical parallax distance
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true, // Smooth scrolling effect
      },
    });


    gsap.set(item, {
      marginLeft: '100vw', // Start off the screen to the right
    });

    const marquee = gsap.to(item, {
      duration: 45,
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
      start: 'top top',
      end: 'bottom center',
      pin: true,
      pinSpacing: true,
      markers: false,

    });

    // Create a ScrollTrigger to control the video blur effect
    gsap.to(videoRef.current, {
      filter: 'blur(64px)', // Initial blur
      scrollTrigger: {
        trigger: videoRef.current,
        start: 'top bottom',
        end: 'top top',
        scrub: true,
        markers: false,
        onUpdate: (self) => {
          // Gradually reduce the blur effect
          const blurAmount = 64 - self.progress * 64;
          gsap.set(videoRef.current, { filter: `blur(${blurAmount}px)` });
        },
      },
    });
  }, []);

  return (
    <div className={styles.wrapper}>
    <div className={styles.childWrapper}>
    <div ref={textRef} className={styles.scrollText}>
    A partner for agencies, brands, and start-ups. <span style={{marginLeft: "20vw"}}>A creative partner for agencies, brands, and start-ups.
</span><span style={{marginLeft: "20vw"}}>A partner for agencies, brands, and start-ups.
</span><span style={{marginLeft: "20vw"}}>A partner for agencies, brands, and start-ups.
</span>
    </div>
    </div>

    <div ref={containerRef} className={styles.scrollContainer}>

      <div ref={videoRef} className={styles.scrollVideoBlur}>

        <video loop muted autoPlay playsInline className="videoInner">
          <source src="/images/ST_2020_ActiveReel_5.mp4" type="video/mp4" />
        </video>
        </div>
    </div>
    </div>

  );
};

export default HorizontalScrollText2;
