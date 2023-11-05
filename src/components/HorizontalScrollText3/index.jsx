import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import styles from './style.module.css';

const HorizontalScrollText3 = () => {
  const videoContainerRef = useRef(null);
  const paragraphRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    const words = ["vision.", "resources."];
    let currentWordIndex = 0;

    const textTimeline = gsap.timeline();

    words.forEach((word, index) => {
      textTimeline.to(paragraphRef.current, {
        duration: 10,
        text: { value: word, padSpace: true },
        onStart: () => {
          currentWordIndex = index;
        },
      });
    });

    // ScrollTrigger to pin the video container
    ScrollTrigger.create({
      trigger: videoContainerRef.current,
      start: 'top top',
      endTrigger: paragraphRef.current,
      end: 'bottom top',
      pin: true,
      pinSpacing: true,
      markers: false,
    });

    // ScrollTrigger for horizontal scroll of marquee text
    ScrollTrigger.create({
      animation: textTimeline,
      trigger: paragraphRef.current,
      start: 'top center',
      end: 'top+=100 center', // Adjust to your needs
      scrub: 0.1,
      onUpdate: (self) => {
        const progress = self.progress;
        const newIndex = Math.floor(progress * words.length);

        if (newIndex !== currentWordIndex) {
          textTimeline.seek(newIndex);
        }
      },
    });

    // ScrollTrigger to pin the marquee text at the bottom within the container
    ScrollTrigger.create({
      trigger: paragraphRef.current,
      start: 'top bottom',
      end: 'bottom bottom',
      pin: true,
      pinSpacing: false,
      markers: false,
    });

  }, []);

  return (
    <div className='dark-section'>
      <div ref={videoContainerRef} className={styles.scrollContainer}>
        <div className={styles.scrollCopy}>
          Our team is both innovative and insightful,<br/>
          offering end to end solutions that streamline<br/>
          and maximize client&apos;s <span ref={paragraphRef}>vision.</span>
        </div>
        <div ref={marqueeRef} className={styles.marquee}>
          <p className={styles.marqueeText}>
            <span>Creative Direction, Development, and Execution</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollText3;
