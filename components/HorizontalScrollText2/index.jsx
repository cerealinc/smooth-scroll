import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';

import styles from './style.module.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const projects = [
  {
      id: "one",
      title: "Miramax",
      details: "<span>Creative Direction</span> <span>Development</span> <span>Production</span>",
      src: "HBH_HSN_15_FINAL_16x9_UPDATE_v01.mp4"
  },
  {
      id: "two",
      title: "New Era",
      details: "<span>Creative Direction</span> <span>Development</span> <span>Production</span>",
      src: "HBH_Energy_15_FINAL_16x9_UPDATE_v01.mp4"
  },
  {
      id: "three",
      title: "Walmart",
      details: "<span>Creative Direction</span> <span>Production</span>",
      src: "HBH_HSN_15_FINAL_16x9_UPDATE_v01.mp4"
  }
]
const HorizontalScrollText2 = () => {
  const textRef = useRef(null);
  const textRef2 = useRef(null);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const wrapperRef = useRef(null);
  const projectWrapperRef = useRef(null);
  const scrollContainerRef = useRef(null); // Add a new ref for the scroll container

  useEffect(() => {
    const item = textRef.current;
    const itemWidth = item.clientWidth;

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
    const item2 = textRef2.current;
    const itemWidth2 = item2.clientWidth;

    gsap.set(item2, {
      marginLeft: '100vw',
    });

    const marquee2 = gsap.to(item2, {
      duration: 45,
      ease: 'none',
      x: '-=' + (itemWidth2 + window.innerWidth),
      repeat: -1,
      repeatRefresh: true,
      modifiers: {
        x: x => (parseFloat(x) % (itemWidth2 + window.innerWidth)) + 'px',
      },
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
          gsap.to(textRef.current, { y: `${blurAmount}` }); // Adjust the duration for video fade

        },

      },
    });

    ScrollTrigger.create({
      trigger: projectWrapperRef.current,
      start: 'top center',
      end: 'top center',
      markers: false,
      onEnter: () => {
        
        gsap.to(textRef.current, { top: 80, duration: 1 }); // Adjust the duration for video fade
        gsap.to(textRef2.current, { top:112, duration: 1 }); // Adjust the duration for video fade
       },
      onLeaveBack: () => {
        gsap.to(textRef.current, { top: 'calc(50vh - 56px)', duration: 1 }); // Adjust the duration for video fade
        gsap.to(textRef2.current, { top: 'calc(50vh - 20px', duration: 1 }); // Adjust the duration for video fade

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
    <div ref={projectWrapperRef} className={styles.projectWrapper}>
      
    <div ref={textRef2} className={styles.scrollText2}>
    Clients Include <span style={{marginLeft: "20vw"}}>Clients Include
</span><span style={{marginLeft: "20vw"}}>Clients Include
</span><span style={{marginLeft: "20vw"}}>Clients Include
</span><span style={{marginLeft: "20vw"}}>Clients Include
</span>
    </div>
    <div className={styles.projectList}>

{
    projects.map(({ id, title, details }) => (
        // eslint-disable-next-line react/jsx-key
        <div
            className={`${styles.projectEl}`}
        >
            <h2
                key={id}
            >

                {title}

            </h2>


            <p style={{
            }} dangerouslySetInnerHTML={{ __html: details }}></p>
        </div>
    ))
}
</div>
    </div>
    </div>

  );
};

export default HorizontalScrollText2;
