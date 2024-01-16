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
    details: "Lorem ipsum dolor sit amet ut labore et dolore magna aliqua. Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    tags: [
      "Creative Direction",
      "Production"
    ],
    src: "saint-steven-taylor-halston-netflix.mp4"
  },
  {
    id: "two",
    title: "New Era",
    img: "2.jpg",
    details: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    tags: [
      "Development",
      "Production"
    ],
    src: "Krewe2020_Thumbnail.mp4"
  },
  {
    id: "three",
    title: "Walmart",
    img: "2.jpg",
    details: "Project Info, Enim ad minim veniam lorem ipsum dolor sit amet consectetur adipiscing elit.",
    tags: [
      "Creative Direction",
      "Development",
      "Production"
    ],
    src: "saint-studio-GME_SRT.mp4"
  },
  {
    id: "four",
    title: "Miramax",
    img: "2.jpg",
    details: "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliequat.",
    tags: [
      "Development",
      "Production"
    ],
    src: "ST_2020_ActiveReel_5.mp4"
  },
  {
    id: "five",
    title: "New Era",
    img: "2.jpg",
    details: "Lorem ipsum dolor sit amet, consectetur ad quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    tags: [
      "Creative Direction",
      "Development",
      "Production"
    ],
    src: "saint-steven-taylor-Official_MP_Trailer_Final.mp4"
  }
]
const HomePage = () => {
  const swapText = useRef(null);
  const textRef = useRef(null);
  const textRef2 = useRef(null);
  const textRef2Wrap = useRef(null);
  const textRef4 = useRef(null);
  const textRef5 = useRef(null);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);
  const projectWrapperRefOuter = useRef(null);
  const featuredReel = useRef(null);
  const gridContainer = useRef(null);
  const projectVideoRef = useRef(null); // Move this line to the top


  const [firstHover, setFirstHover] = useState(false);
  const [workInView, setWorkInView] = useState(false);

  const focusFrontRef = useRef(null);
  const [works, setWorks] = useState([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);



    const gridItems = document.querySelectorAll('.gridItem');

    gsap.to(gridItems, {
      scrollTrigger: {
        trigger: gridContainer.current,
        start: 'top 80%', // Adjust the start position as needed
      },
      opacity: 1,
      marginTop: 0,
      stagger: 0.2, // Adjust the stagger value as needed
      duration: 0.8,
      ease: 'power2.inOut',
    });




    const worksArray = Array.from(document.querySelectorAll('.flexItemWorks'));
    setWorks(worksArray);

    worksArray.forEach((work) => {
      const video = work.querySelector('video');
      const videoWrap = work.querySelector('.projectVideo');
      
      // First gsap.to code for scaling in
      gsap.to(work, {
        scrollTrigger: {
          trigger: work,
          start: 'top+=140 top',
          end: 'bottom top',
          scrub: true,
          markers: false,
          onUpdate: ({ progress, direction, isActive }) => {
            const scaleValue = 1 - progress * 0.1;
            const scaleValue3 = progress * 12;
            const scaleValue2 = progress * 40;
            
            gsap.set(videoWrap, {
              scale: scaleValue,
              marginBottom: `${scaleValue2}px`
            });
          },
        },
      });

      // Second gsap.to code for scaling out
      gsap.to(work, {
        scrollTrigger: {
          trigger: work,
          start: 'top bottom', // Adjust the start value for scaling out
          end: 'top center',
          scrub: true,
          markers: false,
          onUpdate: ({ progress, direction, isActive, self }) => {
            const scaleValue = 0.9 + progress * 0.1; // Adjust the scaling factor for scaling out
            const scaleValue3 = 2 - progress * 12; // Adjust the scaling factor for scaling out
            const scaleValue2 = progress / 40;
            const blurAmount = 8 - progress * 8;
            gsap.set(video, { filter: `blur(${blurAmount}px)` });

            gsap.set(videoWrap, {
              scale: scaleValue,
              marginTop: `${scaleValue2}px`
            });
          },
        },
      });
    });



    // Create a ScrollTrigger to control the video blur effect
    gsap.to(videoRef.current, {
      filter: 'blur(64px)',
      scrollTrigger: {
        trigger: videoRef.current,
        start: 'top-=100 center',
        end: 'top-=100 top',
        scrub: true,
        markers: false,
        onUpdate: (self) => {
          const blurAmount = 20 - self.progress * 20;
          gsap.set(videoRef.current, { filter: `blur(${blurAmount}px)` });
          gsap.to(textRef.current, { y: `${blurAmount}` }); // Adjust the duration for video fade
        },

      },
    });


    // Define onEnter function
    const onEnterFunction = (self) => {
      setWorkInView(true);
      gsap.to(videoRef.current, { opacity: 0, delay: .1, duration: 1 });
      gsap.to(textRef.current, { opacity: 0, marginTop: '-80px', duration: 2 });
      gsap.to(textRef5.current, { opacity: 0.5, marginTop: '-80px', duration: 2 });
      gsap.to(textRef4.current, { opacity: 1, marginTop: '-80px', duration: 2 });
      gsap.to(focusFrontRef.current, { opacity: 1, duration: 2 });

    };

    // Define onLeaveBack function
    const onLeaveBackFunction = (self) => {
      setWorkInView(false);
      gsap.to(focusFrontRef.current, { opacity: 0, duration: 2 });
      gsap.to(videoRef.current, { opacity: 1, delay: 1, duration: 1 });
      gsap.to(textRef.current, { opacity: 1, marginTop: 0, duration: 1 });
      gsap.to(textRef5.current, { opacity: 1, marginTop: 0, duration: 2 });
      gsap.to(textRef4.current, { opacity: 0, marginTop: 0, duration: 2 });
    };


    // Create ScrollTrigger with onEnter and onLeaveBack functions for the outer wrapper
    ScrollTrigger.create({
      trigger: projectWrapperRefOuter.current,
      start: 'top center-=200',
      pin: false, // Pin the outer wrapper
      pinSpacing: false, // Adjust pinSpacing based on your layout needs
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
        <div className={styles.featuredReel} ref={featuredReel}>
          Featured Commissions
        </div>
        <div ref={videoRef} className={styles.scrollVideoBlur}>

          <video loop muted autoPlay playsInline className="videoInner">
            <source src="/images/ST_2020_ActiveReel_5.mp4" type="video/mp4" />
          </video>

        </div>
      </div>



      <div ref={projectWrapperRefOuter} className={styles.projectWrapperOuter} id='your-anchor-2'>




        <div ref={textRef2} className={styles.scrollText2} style={{ display: '' }}>
          {
            projects.map(({ id, title, details, img, src, tags }) => (
              // eslint-disable-next-line react/jsx-key
              <div ref={works} className={`${styles.flexItem} flexItemWorks`}>
                  <div className={`${styles.projectVideo} projectVideo`}>

                <video
                  loop
                  muted
                  autoPlay
                  playsInline
                  key={id}
                  style={{
                    display:
                      activeId === id ? "block" : "block"
                  }}
                >
                  <source src={`/images/${src}`} type="video/mp4" />

                </video>
                </div>

                <div className={styles.projectDetails}>
                <div className={styles.projectDetailsInner}>

                <div
                  ref={swapText}
                  key={id}
                  className={styles.projectHeader}
                >
                  {title}
                </div>
                <p
                                key={id}
                                style={{
                                  display:
                                    activeId === id ? "block" : "block"
                                }}
              
                                dangerouslySetInnerHTML={{ __html: details }}>
                              </p>
                              <div className={styles.projectTags} key={id}>
                              {tags.map((tag, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <span className={styles.bullet}> • </span>}
                    {tag}
                  </React.Fragment>
                ))}                              </div>
              </div>
              </div>
              </div>

            ))
          }


        </div>
      </div>
    </div>

  );
};

export default HomePage;