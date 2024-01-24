import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/dist/SplitText';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { World } from '../World/World';
import { CldVideoPlayer } from 'next-cloudinary';
import { projects } from '@/data/projects';
import { useDesktopAnimation } from '@/hooks/useDesktopAnimation';

import Image from 'next/image'

import styles from './style.module.css';

const HomePage = () => {
  const swapText = useRef(null);
  const textRef = useRef(null);
  const textRef2 = useRef(null);
  const videoRef = useRef(null);
  const projectWrapperRefOuter = useRef(null);
  const childWrapperRef = useRef(null);
  const WorldRef = useRef(null);
  const contactDetailsRef = useRef(null);
  const [workInView, setWorkInView] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const focusFrontRef = useRef(null);
  const [works, setWorks] = useState([]);

  useDesktopAnimation(); // Custom hook for desktop-specific animations

  useEffect(() => {
    gsap.registerPlugin(SplitText, ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    
    const worksArray = Array.from(document.querySelectorAll('.flexItemWorks'));
    setWorks(worksArray);
    
    worksArray.forEach((work) => {
      const video = work.querySelector('video');
      const videoWrap = work.querySelector('.projectVideo');
      const projectDetails = work.querySelector('.projectDetails');
    
      gsap.to(work, {
        scrollTrigger: {
          trigger: work,
          start: "top center", // Use "top center" as a starting point
          end: "bottom top",  // Use "bottom top" as an end point
          scrub: true,
          markers: false,
          onUpdate: ({ progress, direction, isActive }) => {
            
            const scaleValue = 1 - progress * 0.05;
            const scaleValue2 = progress * 180;
            gsap.set(work, {
              y: -scaleValue2,
            });
          },
        },
      });
    
    
      // First gsap.to code for scaling in
      gsap.to(work, {
        scrollTrigger: {
          trigger: work,
          start: 'bottom-=100 top',
          end: 'bottom+=200 top',
          scrub: true,
          markers: false,
          onEnter: ({ progress, direction, isActive }) => {
            gsap.to(work, { filter: `blur(4px)`, duration: 1, });
          },
          onLeaveBack: ({ progress, direction, isActive }) => {
            // Reverse the animation when scrolling back down
            gsap.to(work, { filter: 'blur(0px)', duration: 1 });

          },
          onUpdate: ({ progress, direction, isActive }) => {

            const scaleValue = 1 - progress * 0.05;
            const scaleValue2 = progress * 50;

            gsap.set(videoWrap, {
              scale: scaleValue,
            });

          },
        },
      });
    });



    // Define onEnter function
    const onEnterFunction = (self) => {
      setWorkInView(true);
      gsap.to(videoRef.current, { filter: `blur(12px)`, opacity: 1, duration: 1 });
      gsap.to(focusFrontRef.current, { opacity: 1, duration: 2 });

    };

    // Define onLeaveBack function
    const onLeaveBackFunction = (self) => {
      setWorkInView(false);
      gsap.to(focusFrontRef.current, { opacity: 0, duration: 2 });
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
        trigger: projectWrapperRefOuter.current,
        start: 'bottom center',
        pin: false, // Pin the outer wrapper
        pinSpacing: false, // Adjust pinSpacing based on your layout needs
        markers: false,
        onEnter: ({ progress, direction, isActive }) => {
          gsap.to(childWrapperRef.current, { filter: `blur(0px)`, duration: 1.5, });
        },
        onLeaveBack: ({ progress, direction, isActive }) => {
          // Reverse the animation when scrolling back down
          gsap.to(childWrapperRef.current, {filter: `blur(4px)`, duration: 1.5, });

        },     
      });

      ScrollTrigger.create({
        trigger: projectWrapperRefOuter.current,
        start: 'bottom bottom',
        end: 'bottom center', // Define an end point
        pin: false,
        pinSpacing: false,
        markers: false,
        onUpdate: (self) => {
          // Use the progress value to control the opacity
          const scaleValue = self.progress * 30;
          gsap.set(WorldRef.current, {
            opacity: self.progress, // Progress ranges from 0 to 1
          });
          gsap.set(childWrapperRef.current, {
            y: -scaleValue, // Progress ranges from 0 to 1
          });
        },
        onEnter: () => {
          // If needed, you can still use onEnter for specific actions
        },
        onLeaveBack: () => {
          // If needed, you can still use onLeaveBack for specific actions
        },
      });
      
      






        const world = new World(WorldRef.current);
  
        // starting world
        world.start();


        const throttle = (func, limit) => {
          let lastFunc;
          let lastRan;
          return function() {
            const context = this;
            const args = arguments;
            if (!lastRan) {
              func.apply(context, args);
              lastRan = Date.now();
            } else {
              clearTimeout(lastFunc);
              lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                  func.apply(context, args);
                  lastRan = Date.now();
                }
              }, limit - (Date.now() - lastRan));
            }
          }
        };
        
        const updateZoomThrottled = throttle(function(progress) {
          world.updateZoom(progress);
        }, 10); // Adjust the 100ms to your needs


        ScrollTrigger.create({
          trigger: projectWrapperRefOuter.current,
          start: 'bottom bottom',
          markers: true,
          onEnter: () => world.enableZoom(), // Enable zooming
          onLeave: () => world.disableZoom(), // Disable zooming
          onEnterBack: () => world.enableZoom(), // Enable zooming
          onLeaveBack: () => world.disableZoom(), // Disable zooming
          onUpdate: self => {
            updateZoomThrottled(self.progress);
            console.log(self.progress);
          },
        });


        // locating on model
      // Los Angeles
      world.findLocation(34.0522, -118.2437, world.earth);

      // New York
      world.findLocation(40.7128, -74.0060, world.earth);
      
      
    const handleScroll = (event) => {
      event.stopPropagation(); // Prevent the event from bubbling up
  
      // Optional: Add your custom scroll logic here
      // For example, adjusting `scrollTop` based on `event.deltaY`
    };
  
    const contactDetailsElement = contactDetailsRef.current;
    contactDetailsElement.addEventListener('wheel', handleScroll, { passive: false });
  
    return () => {
      contactDetailsElement.removeEventListener('wheel', handleScroll);
    };


  }, []);

  const [activeId, setActiveId] = useState(0);

  const setActiveElementOnHover = (id) => {
      setActiveId(id);
  };

  return (

<>
<div id="work" className="section">

      <div ref={projectWrapperRefOuter} className={styles.projectWrapperOuter} id='your-anchor-2'>
        <div ref={textRef2} className={styles.scrollText2}>
          {projects.map(({ id, title, details, img, src, tags }) => (
            // eslint-disable-next-line react/jsx-key
            <div key={id} className={`${styles.flexItem} flexItemWorks`} onMouseEnter={() => [setActiveElementOnHover(id)]}>
              {src ? (
                // If src is set, render video
                <div className={`${styles.projectVideo} projectVideo`}>
                          <div className={styles.projectScrollText}>
          <div className={styles.projectMarquee}>
            <div className={`${styles.projectMarqueeContent} ${styles.scrollProject}`}>
              <div className={styles.textBlock}>Case Study Coming Soon</div>
            </div>
            <div className={`${styles.projectMarqueeContent} ${styles.scrollProject}`}>
            <div className={styles.textBlock}>Case Study Coming Soon</div>
            </div>
          </div>
        </div>
   
                  <CldVideoPlayer
                  height={2000}
                  width={2000}
                  controls={false}
    loop muted autoPlay playsInline
    src={`/SAINT/${src}`} type="video/mp4" 
/>
                </div>
              ) : (
                // If src is not set, render image
                <div className={`${styles.projectImage}`}>
                                            <div className={styles.projectScrollText}>
          <div className={styles.projectMarquee}>
            <div className={`${styles.projectMarqueeContent} ${styles.scrollProject}`}>
              <div className={styles.textBlock}>Case Study Coming Soon</div>
            </div>
            <div className={`${styles.projectMarqueeContent} ${styles.scrollProject}`}>
            <div className={styles.textBlock}>Case Study Coming Soon</div>
            </div>
          </div>
        </div>
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
                  <p
                    dangerouslySetInnerHTML={{ __html: details }}></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>

      <div id="contact" className="section">

      <div ref={WorldRef} className={`world-container ${fadeIn ? styles.fadeIn : ''}`}>

      </div>


  <div ref={childWrapperRef} className="world-overlay">



    <div className="contact-wrap">
    <div className="contact-details" ref={contactDetailsRef}>
          <div className="contact-scroll">
          A right hand to strategy, our team is both innovative and insightful, offering end to end solutions that streamline and maximize clients vision, resources, and impact
        <div className="contact-info" style={{textAlign: 'left'}}>
          <h4>PRODUCTION SERVICES</h4>
          <p>135 #01 Beverlv Blvd<br />
            Los Angeles CA, 90036<br />
          </p>
          <h4>CREATIVE SERVICES</h4>
          <p>
          Retouching<br />
          Motion<br />
          Retouching<br />
          Retouching<br />
          Retouching<br />
          Retouching<br />
          Retouching<br />
          Retouching<br />
          Retouching<br />
          Retouching<br />
          Motion<br />
          Retouching<br />
          Motion<br />
          Retouching<br />
          </p>
        </div>
        </div>
      </div>

      <div className="contact-info">
          <h4>ST. STUDIO INC</h4>
          <p>135 #01 Beverlv Blvd<br />
            Los Angeles CA, 90036<br />
          </p>
          <h4>GENERAL</h4>
          <p>
            310 990 0000<br />
            <a href="mailto:00@ST.STUDIO">00@ST.STUDIO</a>
          </p>
          <h4>STUDIO MANAGER</h4>
          <p>
          Camille Waterfallen<br />
           <a href="mailto:CW@ST.STUDIO">CW@ST.STUDIO</a>
          </p>
        </div>

    </div>


  </div>

</div>
<div className={styles.spacer}></div>

</>


  );
};

export default HomePage;