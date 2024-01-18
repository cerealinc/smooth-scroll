import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import Image from 'next/image'

import styles from './style.module.css';

const projects = [
  {
    id: "one",
    title: "New Ara",
    img: "2.jpg",
    details: "Lorem ipsum dolor sit amet ut labore et dolore magna aliqua. Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    tags: [
      "Production",
      "Creative Development",
      "Post Production"
    ],
    src: "new-era.mp4"
  },
  {
    id: "two",
    title: "Lobos 1707",
    img: "2.jpg",
    details: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    tags: [
      "Creative Direction",
      "Creative Development",
      "Production",
      "Post Production"
    ],
    src: "lobos.mp4"
  },
  {
    id: "three",
    title: "Keepers",
    img: "2.jpg",
    details: "Director - Steven Taylor, Photographer - Daniel P, Stvlist - Jaguline. Hair - Kell. Director - Steven Tavlor. Photographer - Daniel P, Stylist - Jaquline, Hair - Kelly,",
    tags: [
      "Creative Direction",
      "Creative Development"
    ],
    src: "saint-studio-GME_SRT.mp4"
  },
  {
    id: "four",
    title: "Haku",
    img: "2.jpg",
    details: "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliequat.",
    tags: [
      "Creative Direction",
      "Creative Development",
      "Executive Production"
    ],
    src: "saint-studio-haku-dr-woo.mp4"
  },
  {
    id: "five",
    title: "Open Innovation",
    img: "2.jpg",
    details: "Director - Steven Taylor, Photographer - Daniel P, Stvlist - Jaguline. Hair - Kell. Director - Steven Tavlor. Photographer - Daniel P, Stylist - Jaquline, Hair - Kelly,",
    tags: [
      "Creative Direction",
      "Creative Development"
    ],
    src: "saint-steven-taylor-Official_MP_Trailer_Final.mp4"
  },
  {
    id: "six",
    title: "Krewe Summer 2020",
    img: "2.jpg",
    details: "Director - Steven Taylor, Photographer - Daniel P, Stvlist - Jaguline. Hair - Kell. Director - Steven Tavlor. Photographer - Daniel P, Stylist - Jaquline, Hair - Kelly,",
    tags: [
      "Creative Direction",
      "Creative Development",
      "Production"
    ],
    src: "Krewe2020_Thumbnail.mp4"
  },
  {
    id: "seven",
    title: "Halston x Netflix",
    img: "2.jpg",
    details: "Director - Steven Taylor, Photographer - Daniel P, Stvlist - Jaguline. Hair - Kell. Director - Steven Tavlor. Photographer - Daniel P, Stylist - Jaquline, Hair - Kelly,",
    tags: [
      "Creative Direction",
      "Creative Development",
      "Executive Production"
    ],
    src: "saint-steven-taylor-halston-netflix.mp4"
  },
  {
    id: "eight",
    title: "Walmart InHome",
    img: "saint-walmart.jpg",
    details: "Project Info, Enim ad minim veniam lorem ipsum dolor sit amet consectetur adipiscing elit.",
    tags: [
      "Production"
    ],
    src: ""
  },
  {
    id: "nine",
    title: "Health by Habit",
    img: "2.jpg",
    details: "Project Info, Enim ad minim veniam lorem ipsum dolor sit amet consectetur adipiscing elit.",
    tags: [
      "Creative Direction",
      "Creative Development",
      "Executive Production"
    ],
    src: "saint-studio-GME_SRT.mp4"
  }
]
const HomePage = () => {
  const swapText = useRef(null);
  const textRef = useRef(null);
  const textRef2 = useRef(null);
  const textRef2Wrap = useRef(null);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);
  const projectWrapperRefOuter = useRef(null);
  const featuredReel = useRef(null);
  const childWrapperRef = useRef(null);

  const [workInView, setWorkInView] = useState(false);

  const focusFrontRef = useRef(null);
  const [works, setWorks] = useState([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);


    const worksArray = Array.from(document.querySelectorAll('.flexItemWorks'));
    setWorks(worksArray);

    worksArray.forEach((work) => {
      const video = work.querySelector('video');
      const videoWrap = work.querySelector('.projectVideo');
      const projectDetails = work.querySelector('.projectDetails');

      // First gsap.to code for scaling in
      gsap.to(work, {
        scrollTrigger: {
          trigger: work,
          start: 'bottom-=100 top',
          end: 'bottom+=200 top',
          scrub: true,
          markers: false,
          onEnter: ({ progress, direction, isActive }) => {
            gsap.to(work, { filter: `blur(4px)`, duration: 4, });

          },
            onLeaveBack: ({ progress, direction, isActive }) => {
              // Reverse the animation when scrolling back down
              gsap.to(work, { filter: 'blur(0px)', duration: 2 });

            },
          onUpdate: ({ progress, direction, isActive }) => {

            const scaleValue = 1 - progress * 0.05;
            const scaleValue2 = progress * 10;

            gsap.set(videoWrap, {
              scale: scaleValue,
            });
            
          },
        },
      });
  /*
      // Second gsap.to code for scaling out
      gsap.to(work, {
        scrollTrigger: {
          trigger: work,
          start: 'top bottom-=160', // Adjust the start value for scaling out
          scrub: true,
          onEnter: ({ progress, direction, isActive }) => {
            gsap.to(work, { filter: `blur(0px)`, duration: 2, });
            },
            onLeaveBack: ({ progress, direction, isActive }) => {
              // Reverse the animation when scrolling back down
              gsap.to(work, { filter: `blur(4px)`, duration: 4, });
          },
        },
      });
    
      gsap.to(work, {
        scrollTrigger: {
          trigger: work,
          start: 'top bottom+=200', // Adjust the start value for scaling out
          end: 'top center+=200',
          scrub: true,
          markers: false,
          
          onUpdate: ({ progress, direction, isActive, self }) => {
            const scaleValue = progress * 0.1 + 0.9; // Adjust the scaling factor for videoWrap
            const scaleValue2 = progress / 40;
            const blurAmount = 16 - progress * 16;
            gsap.to(videoWrap, {
              scale: scaleValue,
            });
          },
        },
      });
      */
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
      gsap.to(videoRef.current, {filter: `blur(12px)`, opacity: 1, duration: 1 });
      gsap.to(focusFrontRef.current, { opacity: 1, duration: 2 });

    };

    // Define onLeaveBack function
    const onLeaveBackFunction = (self) => {
      setWorkInView(false);
      gsap.to(focusFrontRef.current, {opacity: 0, duration: 2 });
      gsap.to(videoRef.current, { opacity: 1, duration: 1 });
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
    
    // Create ScrollTrigger with onEnter and onLeaveBack functions for the outer wrapper
    ScrollTrigger.create({
      trigger: childWrapperRef.current,
      start: 'top top',
      end: 'bottom top',
      pin: false, // Pin the outer wrapper
      pinSpacing: false, // Adjust pinSpacing based on your layout needs
      markers: false,
      onUpdate: (self) => {
        const blurAmount = 20 - self.progress * 20;
        const scroll = self.progress * 560; // Adjust the factor based on your needs
        gsap.set(textRef.current, { opacity: 1, marginTop: `-${scroll}px` });
       // gsap.set(childWrapperRef.current, {height: `${scroll}vh` });
      },
      onLeaveBack:  (self) => {
        gsap.set(textRef.current, { opacity: 1, marginTop: `0px` });
       
      }
    });
    /*

    ScrollTrigger.create({
      trigger: childWrapperRef.current,
      start: 'bottom-=120 top',
      pin: true, // Pin the outer wrapper
      pinSpacing: false, // Adjust pinSpacing based on your layout needs
      markers: false,
      endTrigger: projectWrapperRefOuter.current, // Set the endTrigger to projectWrapperRefOuter
      end: 'bottom bottom', // Pin ends when the bottom of projectWrapperRefOuter reaches the bottom of the viewport
    });
        */

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



  return (
    <div ref={wrapperRef} className={styles.wrapper}>


      <div ref={childWrapperRef} className={styles.childWrapper}>
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

      <div ref={containerRef} className={styles.scrollContainer}>
        <div className={styles.featuredReel} ref={featuredReel}>
          Featured Commissions
        </div>
        <div ref={videoRef} className={styles.scrollVideoBlur}>

          <video loop muted autoPlay playsInline className="videoInner isDark">
            <source src="/images/ST_2020_ActiveReel_5.mp4" type="video/mp4" />
          </video>

        </div>
      </div>
      </div>


      <div ref={projectWrapperRefOuter} className={styles.projectWrapperOuter} id='your-anchor-2'>
          <div ref={textRef2} className={styles.scrollText2}>
            {projects.map(({ id, title, details, img, src, tags }) => (
              // eslint-disable-next-line react/jsx-key
              <div key={id} className={`${styles.flexItem} flexItemWorks`}>
                {src ? (
                  // If src is set, render video
                  <div className={`${styles.projectVideo} projectVideo`}>
                    <video loop muted autoPlay playsInline>
                      <source src={`/images/${src}`} type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  // If src is not set, render image
                  <div className={`${styles.projectImage}`}>
                  <img src={`/images/${img}`} alt={title} />
                  </div>
                )}

                <div className={`${styles.projectDetails} projectDetails`}>
                  <div className={styles.projectDetailsInner}>
                    <div ref={swapText} className={styles.projectHeader}>
                      {title}
                    </div>
                    <div className={styles.projectTags}>
                      {tags.map((tag, index) => (
                        <React.Fragment key={index}>
                          {index > 0 && <span className={styles.bullet}>, </span>}
                          {tag}
                        </React.Fragment>
                      ))}
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: details }}></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default HomePage;