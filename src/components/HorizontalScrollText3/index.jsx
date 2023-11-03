import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin'; // Import the TextPlugin
import styles from './style.module.css';

const HorizontalScrollText3 = () => {
  const videoContainerRef = useRef(null); // Change this to the parent container
  const paragraphRef = useRef(null);
  const paragraphRef2 = useRef(null);
  const helpMe = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    const words = ["vision", "innovation",]; // Define an array of words to cycle through
    const words2 = ["resources", "another",]; // Define an array of words to cycle through
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
    words2.forEach((word2, index) => {
      textTimeline.to(paragraphRef2.current, {
        duration: 10,
        text: { value: word2, padSpace: false },
        onStart: () => {
          currentWordIndex = index;
        },
      });
    });
    ScrollTrigger.create({
      trigger: videoContainerRef.current, // Change to the parent container
      start: 'top top', // Pin when the video container reaches the top
      endTrigger: paragraphRef.current,
      end: 'bottom top', // Unpin when the text is at the top
      pin: true,
      pinSpacing: true, // Adjust as needed
      markers: false,
    });
    ScrollTrigger.create({
      trigger: helpMe.current, // Change to the parent container
      start: 'top top', // Pin when the video container reaches the top
      endTrigger: helpMe.current,
      end: 'top top', // Unpin when the text is at the top
      markers: false,
    });
    ScrollTrigger.create({
      animation: textTimeline,
      trigger: paragraphRef.current,
      start: 'top+=20 center',
      end: 'top+=20 center',
      scrub: 0.2, // Adjust this value to control the transition speed
      markers: false,
      onUpdate: (self) => {
        const progress = self.progress;
        const newIndex = Math.floor(progress * words.length);

        if (newIndex !== currentWordIndex) {
          textTimeline.seek(newIndex);
        }
      },
    });
    ScrollTrigger.create({
      animation: textTimeline,
      trigger: paragraphRef2.current,
      start: 'top+=150 center',
      end: 'top+=150 center',
      scrub: 0.2, // Adjust this value to control the transition speed
      markers: false,
      onUpdate: (self) => {
        const progress = self.progress;
        const newIndex = Math.floor(progress * words2.length);

        if (newIndex !== currentWordIndex) {
          textTimeline.seek(newIndex);
        }
      },
    });

    return () => {
      textTimeline.kill();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ScrollTrigger.getById(videoContainerRef.current).kill(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ScrollTrigger.getById(paragraphRef.current).kill(true);
    };
  }, []);

  return (
    <>
      <div ref={videoContainerRef} className={styles.scrollContainer}>
        <div className={styles.scrollCopy}>
          Our team is both innovative and insightful, offering end to end solutions that streamline and maximize client&apos;s <span ref={paragraphRef}>vision</span>, <span ref={paragraphRef2}>resources</span>, and impact.
        </div>

      </div>


    </>
  );
};

export default HorizontalScrollText3;
