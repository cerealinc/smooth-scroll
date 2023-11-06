import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import styles from './style.module.css';
import TextScrollAuto from '../textScrollAuto';

const HorizontalScrollText3 = () => {
  const videoContainerRef = useRef(null);
  const paragraphRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeContainerRef = useRef(null);

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



    // ScrollTrigger to pin the marquee text at the center within the container
    ScrollTrigger.create({
      trigger: marqueeRef.current,
      start: 'top center',
      end: 'top top',
      pin: true,
      pinSpacing: true,
      markers: true,
    });
  }, []);

  return (
    <>
      <div className="dark-section">
        <div ref={videoContainerRef} className={styles.scrollContainer}>
          <div className={styles.scrollCopy}>
            Our team is both innovative and insightful,<br />
            offering end to end solutions that streamline<br />
            and maximize client's <span ref={paragraphRef}>vision.</span>
          </div>
          <div ref={marqueeContainerRef}>
        <div ref={marqueeRef}>
          <TextScrollAuto />
        </div>
      </div>
        </div>
      </div>

    </>
  );
};

export default HorizontalScrollText3;
