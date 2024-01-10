import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import Image from 'next/image'

import styles from './style.module.css';

const projects = [
  {
    id: "one",
    title: "Miramax",
    img: "2.jpg",
    details: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><span>Creative Direction</span> <span>Development</span> <span>Production</span>",
    src: "ST_2020_ActiveReel_5.mp4"
  },
  {
    id: "two",
    title: "New Era",
    img: "2.jpg",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.<span>Creative Direction</span> <span>Development</span> <span>Production</span>",
    src: "HBH_Energy_15_FINAL_16x9_UPDATE_v01.mp4"
  },
  {
    id: "three",
    title: "Walmart",
    img: "2.jpg",
    details: "<p>Project Info, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p><span>Creative Direction</span> <span>Development</span> <span>Production</span>",
    src: "HBH_HSN_15_FINAL_16x9_UPDATE_v01.mp4"
  },
  {
    id: "four",
    title: "Miramax",
    img: "2.jpg",
    details: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><span>Creative Direction</span> <span>Development</span> <span>Production</span>",
    src: "ST_2020_ActiveReel_5.mp4"
  },
  {
    id: "five",
    title: "New Era",
    img: "2.jpg",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam<span>Creative Direction</span> <span>Development</span> <span>Production</span>",
    src: "HBH_Energy_15_FINAL_16x9_UPDATE_v01.mp4"
  }
]
const HomePage = () => {
  const swapText = useRef(null);
  const textRef = useRef(null);
  const textRef2 = useRef(null);

  const textRef2Wrap = useRef(null);

  
  const textRef4Wrap = useRef(null);
  const textRef4 = useRef(null);
  const textRef5 = useRef(null);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);
  const projectWrapperRef = useRef(null);
  const projectWrapperRefOuter = useRef(null);
  const [firstHover, setFirstHover] = useState(false);
  const [workInView, setWorkInView] = useState(false);

  const focusFrontRef = useRef(null);
  const [works, setWorks] = useState([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    const worksArray = Array.from(document.querySelectorAll('.flexItemWorks')); // Assuming .flexItem is the class of the elements you want to animate
    setWorks(worksArray); // Set the works array state
    worksArray.forEach((work) => {
      const image = work.querySelector('img'); // Select the image inside the .flexItemWorks element
      gsap.to(work, {
        scrollTrigger: {
          trigger: work,
          start: 'top-=140 top',
          end: 'bottom top',
          scrub: true,
          markers: false,
          onUpdate: ({ progress, direction, isActive }) => {
            const scaleValue = 1 - progress * .9; // Adjust the scaling factor as needed
            gsap.set(work, { scale: scaleValue });
          },
        },
      });
    });
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      scrub: true,
      pin: true,
      pinSpacing: false,
      markers: false,
      onUpdate: (self) => {
        const blurAmount = 140 - self.progress * 140;
        gsap.to(videoRef.current, { opacity: { blurAmount } });
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
      gsap.to(videoRef.current, { opacity: 0, delay: .1, duration: 1 });
      gsap.to(textRef2.current, { opacity: 1, y: 0, duration: 3 });
      gsap.to(textRef5.current, { opacity: 0.5, marginTop: '-80px', duration: 2 });
      gsap.to(textRef4.current, { opacity: 1, marginTop: '-80px', duration: 2 });
      gsap.to(focusFrontRef.current, { opacity: 1, duration: 2 });


    };

    // Define onLeaveBack function
    const onLeaveBackFunction = (self) => {
      setWorkInView(false);
      gsap.to(focusFrontRef.current, { opacity: 0, duration: 2 });
      gsap.to(videoRef.current, { opacity: 1, delay: 1, duration: 1 });
      gsap.to(textRef2.current, { opacity: .5, y: 100, duration: 3 });
      gsap.to(textRef5.current, { opacity: 1, marginTop: 0, duration: 2 });
      gsap.to(textRef4.current, { opacity: 0, marginTop: 0, duration: 2 });

    };


      // Create ScrollTrigger with onEnter and onLeaveBack functions for the outer wrapper
ScrollTrigger.create({
  trigger: projectWrapperRefOuter.current,
  start: 'top top+=140',
  end: 'bottom bottom',
  pin: true, // Pin the outer wrapper
  pinSpacing: false, // Adjust pinSpacing based on your layout needs
  markers: false,
  onEnter: onEnterFunction,
  onLeaveBack: onLeaveBackFunction,
});

// Create ScrollTrigger for the scrolling content inside the outer wrapper
ScrollTrigger.create({
  trigger: projectWrapperRef.current,
  start: 'top top+=140',
  end: 'bottom bottom',
  scrub: true, // Allow scrolling inside the pinned outer wrapper
  markers: false,
  onEnter: onEnterFunction,
  onLeaveBack: onLeaveBackFunction,
});

  }, []);
// Add this code within your useEffect to handle scroll and clip the text
useEffect(() => {
  const handleScroll = () => {
    const scrollClipRef = textRef2Wrap.current;
    const scrollTextRef = textRef2.current;

    if (scrollClipRef && scrollTextRef) {
      const scrollClipRect = scrollClipRef.getBoundingClientRect();
      const scrollTextRect = scrollTextRef.getBoundingClientRect();

      // Check if scrollText is behind scrollClip
      if (scrollTextRect.bottom < scrollClipRect.top) {
        // Apply clip to hide scrollText when it's behind scrollClip
        scrollTextRef.style.clipPath = 'inset(100% 100% 100% 100%)';
      } else {
        // Reset clip if scrollText is visible
        scrollTextRef.style.clipPath = 'none';
      }
    }
  };

  // Add event listener for scroll
  window.addEventListener('scroll', handleScroll);

  // Clean up the event listener on component unmount
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
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
    <div ref={wrapperRef} className={styles.wrapper}>


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
      <div ref={textRef4Wrap} className={`${styles.scrollText4Wrap} ${workInView ? styles.inView : styles.notInView}`}>

      <div ref={textRef4} className={styles.scrollText4}>
          <div className={styles.marquee}>
            <div className={`${styles.marqueeContent} ${styles.scroll}`}>
              <div className={styles.textBlock}>Select Commissions Include</div>
            </div>
            <div className={`${styles.marqueeContent} ${styles.scroll}`}>
              <div className={styles.textBlock}>Select Commissions Include</div>
            </div>
          </div>

        </div>
        </div>

      <div className={styles.scrollTextWrap} style={{ display: '' }}>

      <div  ref={projectWrapperRefOuter} className={styles.projectWrapperOuter} id='your-anchor-2'>

        <div ref={projectWrapperRef} className={styles.projectWrapper} id='your-anchor-id'>

          <div className={styles.overlay}></div>
          <div ref={textRef5} className={`${styles.scrollText5} ${workInView ? styles.inView : styles.notInView}`}>
            <div className={styles.marquee}>
              <div className={`${styles.marqueeContent} ${styles.scroll}`}>
                <div className={styles.textBlock}>Select Commissions Include</div>
              </div>
              <div className={`${styles.marqueeContent} ${styles.scroll}`}>
                <div className={styles.textBlock}>Select Commissions Include</div>
              </div>
            </div>

          </div>
          <div className={styles.projectDetails}>
            {
              projects.map(({ id, details }) => (
                // eslint-disable-next-line react/jsx-key
                <span
                  key={id}
                  style={{
                    display:
                      activeId === id ? "block" : "none"
                  }}

                  dangerouslySetInnerHTML={{ __html: details }}>
                </span>

              )
              )
            }

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
                      activeId === id ? "none" : "none"
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

      <div className={styles.parent}>

      <div ref={textRef2} className={styles.scrollText2} style={{ display: '' }}>
        {
          projects.map(({ id, title, details, img }) => (
            // eslint-disable-next-line react/jsx-key
            <div ref={works} className={`${styles.flexItem} flexItemWorks`}>
              <Image alt="Alt" className='fuck' src={`/images/${img}`} width={600} height={800} />
              <span
                ref={swapText}
                key={id}
                className={styles.listItem}
                onMouseEnter={() => [setActiveElementOnHover(id), handleProjectHover()]}
              >
                {workInView ? title : title}
              </span>
            </div>

          ))
        }


      </div>
    </div>
    </div>
    </div>

  );
};

export default HomePage;