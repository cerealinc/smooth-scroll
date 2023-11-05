import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CSSPlugin } from 'gsap/CSSPlugin'; // Import CSSPlugin

import styles from './style.module.css';

gsap.registerPlugin(ScrollTrigger, CSSPlugin); // Register CSSPlugin

const HorizontalScrollText2 = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    // Parallax effect for the text
    gsap.to(headerRef.current, {
      y: 180, // Adjust the vertical parallax distance
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top-=200 center',
        end: 'center center',
        scrub: true, // Smooth scrolling effect
        markers: false
      },
    });

    // Parallax effect for the video
    gsap.to(videoRef.current, {
      y: 0, // Adjust the vertical parallax distance
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true, // Smooth scrolling effect
      },
    });

    // Your existing GSAP code for horizontal text animation and pinning
    const item = textRef.current;
    const itemWidth = item.clientWidth;

    gsap.set(item, {
      marginLeft: '100vw',
    });

    const marquee = gsap.to(item, {
      duration: 15,
      ease: 'none',
      x: '-=' + (itemWidth + window.innerWidth),
      repeatRefresh: true, // Repeats animation when it reaches the end

      repeat: -1,
      modifiers: {
        x: x => (parseFloat(x) % (itemWidth + window.innerWidth)) + 'px',
      },
    });

    const master = gsap.timeline().add(marquee, 0);

    const tween = gsap.to(master, { duration: 1.5, timeScale: 1, paused: true });
    const timeScaleClamp = gsap.utils.clamp(1, 6);

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom center',
      pin: true,
      pinSpacing: true,
      markers: false,
      onUpdate: self => {
        master.timeScale(timeScaleClamp(Math.abs(self.getVelocity() / 200)));
        tween.invalidate().restart();
      },
    });

    // Create a ScrollTrigger to control the video blur effect
    gsap.to(videoRef.current, {
      filter: 'blur(10px)', // Initial blur
      scrollTrigger: {
        trigger: videoRef.current,
        start: 'top bottom',
        end: 'top top',
        scrub: true,
        markers: false,
        onUpdate: (self) => {
          // Gradually reduce the blur effect
          const blurAmount = 10 - self.progress * 10;
          gsap.set(videoRef.current, { filter: `blur(${blurAmount}px)` });
        },
      },
    });
  }, []);

  return (
    <div ref={containerRef} className={styles.scrollContainer}>
      <div ref={headerRef} className={styles.scrollHeader}>
        A right hand to strategy
      </div>
      <div ref={textRef} className={styles.scrollText}>
        A creative partner for agencies, brands, and start-ups.
      </div>
      <div ref={videoRef} className={styles.scrollVideo}>
        <video loop muted autoPlay playsInline className="videoInner">
          <source src="/images/ST_2020_ActiveReel_5.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default HorizontalScrollText2;
