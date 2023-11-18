import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';

import styles from './style.module.css';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const projects = [
  {
      id: "one",
      title: "Miramax",
      details: "<span>Creative Direction</span> <span>Development</span> <span>Production</span>",
      src: "ST_2020_ActiveReel_5.mp4"
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
  const swapText = useRef(null);
  const textRef = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);
  const textRef4 = useRef(null);
  const textRef5 = useRef(null);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const wrapperRef = useRef(null);
  const projectWrapperRef = useRef(null);
  const scrollContainerRef = useRef(null); // Add a new ref for the scroll container
  const [firstHover, setFirstHover] = useState(false);
  const [workInView, setWorkInView] = useState(false);

  const focusFrontRef = useRef(null);

  useEffect(() => {
      const focusFront = focusFrontRef.current;
    const item = textRef.current;
    const itemWidth = item.clientWidth;

    const item2 = textRef2.current;
    const itemWidth2 = item2.clientWidth;

    const item4 = textRef4.current;
    const itemWidth4 = item4.clientWidth;


    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      pin: true,
      pinSpacing: false,
      markers: false,
      onUpdate: (self) => {
        const blurAmount = 140 - self.progress * 140;
        gsap.to(videoRef.current, { opacity: {blurAmount}, duration: 2 });
      },
    });

    // Create a ScrollTrigger to control the video blur effect
    gsap.to(videoRef.current, {
      filter: 'blur(64px)',
      scrollTrigger: {
        trigger: videoRef.current,
        start: 'top bottom',
        end: 'top-=300 top',
        scrub: true,
        markers: false,
        onUpdate: (self) => {
          const blurAmount = 140 - self.progress * 140;
          gsap.set(videoRef.current, { filter: `blur(${blurAmount}px)` });
          gsap.to(textRef.current, { y: `${blurAmount}` }); // Adjust the duration for video fade
        },

      },
    });


// Define onEnter function
const onEnterFunction = (self) => {
  setWorkInView(true);
  gsap.to(videoRef.current, { opacity: 0, delay: 1, duration: 1 });
  gsap.to(textRef2.current, { opacity: 1, y: 0, duration: 3 });
  gsap.to(textRef4.current, { opacity: 1, y: -62, duration: 3 });
  gsap.to(textRef5.current, { opacity: 0, y: -62, duration: 3 });

  gsap.to(window, {
    duration: 2,
    scrollTo: {
      y: "#your-anchor-id", // Replace with your anchor ID or selector
      offsetY: 0,
      autoKill: false, // Prevents ScrollToPlugin from canceling previous scrolls
    },
    ease: "power3.inOut",
  });
  
};

// Define onLeaveBack function
const onLeaveBackFunction = (self) => {
  setWorkInView(false);
  gsap.to(videoRef.current, { opacity: 1, delay: 2, duration: 1 });
  gsap.to(textRef2.current, { opacity: 0, y: 100, duration: 3 });
  gsap.to(textRef4.current, { opacity: 0, y: 0, duration: .5 });
  gsap.to(textRef5.current, { opacity: 1, y: 0, duration: 1 });
};

// Create ScrollTrigger with onEnter and onLeaveBack functions
ScrollTrigger.create({
  trigger: projectWrapperRef.current,
  start: 'top+=40 center',
  scrub: true,
  markers: false,
  onEnter: onEnterFunction,
  onLeaveBack: onLeaveBackFunction,
});

  }, []);

  
  const handleProjectHover = () => {
    if (!firstHover) {
        setFirstHover(true); // Set the flag to indicate the first hover
    }
}

useEffect(() => {
  // Use gsap.to for the animation
  gsap.to(swapText.current, {
    opacity: workInView ? 1 : 0, // Set opacity based on workInView
    duration: 0.5, // Animation duration
    ease: 'power2.inOut', // Easing function
  });
}, [workInView]); // Run the effect when workInView changes

  const [activeId, setActiveId] = useState(0);

  const setActiveElementOnHover = (id) => {
      setActiveId(id);
  };

  const focusClasses = `${firstHover ? styles.hovered : styles.notHovered}`;

  return (
    <div  ref={wrapperRef} className={styles.wrapper}>


    <div className={styles.childWrapper}>
    <div ref={textRef} className={styles.scrollText}>
    <div className={styles.marquee}>
    <div className={`${styles.marqueeContent} ${styles.scroll}`}>
      <div className={styles.textBlock}>A partner for agencies, brands, and start-ups</div>
      </div>
      <div className={`${styles.marqueeContent} ${styles.scroll}`}>
        <div className={styles.textBlock}>A partner for agencies, brands, and start-ups</div>
      </div>
    </div>
    </div>
    </div>

    <div ref={containerRef} className={styles.scrollContainer}>

      <div ref={videoRef} className={styles.scrollVideoBlur}>

        <video loop muted autoPlay playsInline className="videoInner">
          <source src="/images/ST_2020_ActiveReel_5.mp4" type="video/mp4" />
        </video>
        
        </div>
    </div>


    <div className={styles.projectWrapperOuter}>
    <div ref={textRef4} className={styles.scrollText4}>
          <div className={styles.marquee}>
      <div className={`${styles.marqueeContent} ${styles.scroll}`}>
        <div className={styles.textBlock}>Select Clients Include</div>
      </div>
      <div className={`${styles.marqueeContent} ${styles.scroll}`}>
      <div className={styles.textBlock}>Select Clients Include</div>
      </div>
    </div>

    </div>

    <div ref={projectWrapperRef} className={styles.projectWrapper}  id='your-anchor-id'>

    <div className={styles.overlay}></div>
    <div ref={textRef5} className={`${styles.scrollText5} ${workInView ? styles.wd : styles.start}`}>
          <div className={styles.marquee}>
      <div className={`${styles.marqueeContent} ${styles.scroll}`}>
        <div className={styles.textBlock}>Select Clients Include</div>
      </div>
      <div className={`${styles.marqueeContent} ${styles.scroll}`}>
      <div className={styles.textBlock}>Select Clients Include</div>
      </div>
    </div>

    </div>
<div ref={textRef2} className={styles.scrollText2} style={{display: ''}}>
<div className={styles.marquee}>
<div className={`${styles.marqueeContent} ${styles.scroll}`}>
<div className={styles.textBlock}>
  {
    projects.map(({ id, title, details }) => (
        // eslint-disable-next-line react/jsx-key
            <span
                ref={swapText}
                key={id}
                className={styles.listItem}
                onMouseEnter={() => [setActiveElementOnHover(id), handleProjectHover()]}
            >
            {workInView ? title : title},
            </span>

    ))
}
</div>
</div>
<div className={`${styles.marqueeContent} ${styles.scroll}`}>
<div className={styles.textBlock}>
{
    projects.map(({ id, title, details }) => (
        // eslint-disable-next-line react/jsx-key
            <span
                ref={swapText}
                key={id}
                className={styles.listItem}
                onMouseEnter={() => [setActiveElementOnHover(id), handleProjectHover()]}
            >
            {workInView ? title : title},
            </span>

    ))
}
</div>
</div>
</div>

</div>
<div ref={focusFrontRef} className={`${styles.focusFront} ${focusClasses}`}>

<div className={styles.overlay}></div>
        {
            projects.map(({ id, src }) => (
                <video
                    loop
                    muted
                    autoPlay
                    playsInline
                    key={id}
                    className={styles.video}
                    style={{
                        display:
                            activeId === id ? "block" : "none"
                    }}
                >
                    <source src={`/images/${src}`} type="video/mp4" />

                </video>
            )
            )
        }

    </div>
</div>
</div>
    </div>

  );
};

export default HorizontalScrollText2;
