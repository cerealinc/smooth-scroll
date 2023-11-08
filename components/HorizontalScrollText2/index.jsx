import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import styles from './style.module.css';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollText2 = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const wrapperRef = useRef(null);
  
  useEffect(() => {
    const item = textRef.current;
    const itemWidth = item.clientWidth;

    gsap.to(item, {
      y: 0,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        markers: false,
      },
    });

    gsap.to(videoRef.current, {
      y: -260,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      },
    });

    gsap.set(item, {
      marginLeft: '100vw',
    });

    const marquee = gsap.to(item, {
      duration: 45,
      ease: 'none',
      x: '-=' + (itemWidth + window.innerWidth),
      repeat: -1,
      repeatRefresh: true,
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
      filter: 'blur(64px)',
      scrollTrigger: {
        trigger: videoRef.current,
        start: 'top bottom',
        end: 'top top',
        scrub: true,
        markers: false,
        onUpdate: (self) => {
          const blurAmount = 64 - self.progress * 64;
          gsap.set(videoRef.current, { filter: `blur(${blurAmount}px)` });
        },
      },
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'bottom center',
      end: 'bottom bottom',
      duration: 2, // Adjust the duration to slow down the transition
      onEnter: () => {
        gsap.to(videoRef.current, { opacity: 0, duration: 1 }); // Adjust the duration for video fade
        gsap.to(item, { top: '80px', duration: 1 }); // Adjust the duration for item transition
        gsap.to(wrapperRef.current, { paddingTop: '14vh', duration: 1 }); // Adjust the duration for wrapper transition
      },
      onLeaveBack: () => {
        gsap.to(videoRef.current, { opacity: 1, duration: 1 }); // Adjust the duration for video fade
        gsap.to(item, { top: 'calc(50vh - 56px)', duration: 1 }); // Adjust the duration for item transition
        gsap.to(wrapperRef.current, { paddingTop: '58vh', duration: 1 }); // Adjust the duration for wrapper transition
      },
    });
  }, []);

  return (
    <div  ref={wrapperRef} className={styles.wrapper}>
    <div className={styles.childWrapper}>
    <div ref={textRef} className={styles.scrollText}>
    A partner for agencies, brands, and start-ups <span style={{marginLeft: "20vw"}}>A partner for agencies, brands, and start-ups
</span><span style={{marginLeft: "20vw"}}>A partner for agencies, brands, and start-ups
</span><span style={{marginLeft: "20vw"}}>A partner for agencies, brands, and start-ups
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
