import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
      duration: 15,
      ease: 'none',
      x: '-=' + (itemWidth + window.innerWidth), // Animate off the screen to the left
      repeat: -1,
      repeatRefresh: true, // Repeats animation when it reaches the end
      modifiers: {
        x: x => (parseFloat(x) % (itemWidth + window.innerWidth)) + 'px',
      },
    });

    const master = gsap.timeline().add(marquee, 0);

    const tween = gsap.to(master, { duration: 1.5, timeScale: 1, paused: true });
    const timeScaleClamp = gsap.utils.clamp(1, 6);

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top center',
      end: 'bottom center',
      pin: true, // Pin the container
      pinSpacing: false, // Remove space when pinned
      markers: false, // Remove this in production
      onUpdate: self => {
        master.timeScale(timeScaleClamp(Math.abs(self.getVelocity() / 200)));
        tween.invalidate().restart();
      },
    });
  }, []);

  return (
    <div ref={containerRef} className={styles.scrollContainer}>
      <div ref={textRef} className={styles.scrollText}>
        A creative partner for agencies, brands, and start-ups.
      </div>
    </div>
  );
};

export default HorizontalScrollText;
