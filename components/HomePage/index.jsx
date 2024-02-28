import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/dist/SplitText';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { World } from '../World/World';
import { CldVideoPlayer } from 'next-cloudinary';
import { projects } from '@/data/projects';
import { useDesktopAnimation } from '@/hooks/useDesktopAnimation';

import styles from './style.module.css';

const HomePage = ({ startLenis, stopLenis }) => {





  // State for device type
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    // Check if the user is on a mobile device
    setIsMobileDevice(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    );
  }, []);

  // State to manage the number of displayed projects
  // Will be set after the device type is determined
  const [displayedProjects, setDisplayedProjects] = useState(projects.length);

  useEffect(() => {
    // Set the initial number of projects based on device type
    if (isMobileDevice) {
      setDisplayedProjects(3);
    }
  }, [isMobileDevice]);

  // Function to handle "View More" button click
  const loadMoreProjects = () => {
    setDisplayedProjects(prev => prev + 3);
  };
  const swapText = useRef(null);
  const spacerRef = useRef(null);
  const spacerwRef = useRef(null);
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
  const isMobile = () => {
    // Ensure this runs only on the client side
    if (typeof window !== "undefined") {
      // Simple check for mobile devices
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
    }
    return false; // Default to false if not on the client side
  };
  useDesktopAnimation(); // Custom hook for desktop-specific animations

  useEffect(() => {
    gsap.registerPlugin(SplitText, ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);


    const worksArray = Array.from(document.querySelectorAll('.flexItemWorks'));
    setWorks(worksArray);

    worksArray.forEach((work) => {
      const videoWrap = work.querySelector('.projectVideo');


      // Different scale value for mobile
      const mobileScaleMultiplier = isMobile() ? 20 : 50; // Adjust this value as needed

      gsap.to(work, {
        scrollTrigger: {
          trigger: work,
          start: "top center",
          end: "bottom top",
          scrub: true,
          markers: false,
          onUpdate: ({ progress }) => {
            const scaleValue2 = progress * mobileScaleMultiplier;
            gsap.set(work, {
              yPercent: -scaleValue2,
            });
          },
        },
      });


      // First gsap.to code for scaling in
      gsap.to(work, {
        scrollTrigger: {
          trigger: work,
          start: 'center top',
          scrub: true,
          onEnter: ({ progress, direction, isActive }) => {
            gsap.to(work, { filter: `blur(4px)`, duration: 1, });
          },
          onLeaveBack: ({ progress, direction, isActive }) => {
            // Reverse the animation when scrolling back down
            gsap.to(work, { filter: 'blur(0px)', duration: 1 });

          },
          onUpdate: ({ progress, direction, isActive }) => {

            const scaleValue = 1 - progress * 0.07;
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
        gsap.to(childWrapperRef.current, { filter: `blur(4px)`, duration: 1.5, });

      },
    });

    ScrollTrigger.create({
      trigger: projectWrapperRefOuter.current,
      start: 'bottom bottom',
      end: 'bottom center-=200', // Define an end point
      pin: false,
      pinSpacing: false,
      markers: false,
      onUpdate: (self) => {
        // Assuming you want to start at a dynamic position, for example, -100px, and end at 0
        const startY = 140; // Dynamic starting position
        const endY = 0; // Ending position

        // Calculate the current y value based on progress
        const currentY = startY + (endY - startY) * self.progress; // Interpolates from startY to endY

        // Apply the calculated y value
        gsap.set(childWrapperRef.current, {
          y: currentY,
        });

        // Adjust opacity based on progress
        gsap.set(WorldRef.current, {
          opacity: self.progress, // Progress ranges from 0 to 1
        });
      },
      onEnter: () => {
        // Additional actions on enter
      },
      onLeaveBack: () => {
        // Additional actions on leave back
      },
    });









    const world = new World(WorldRef.current);

    // starting world
    world.start();


    const throttle = (func, limit) => {
      let lastFunc;
      let lastRan;
      return function () {
        const context = this;
        const args = arguments;
        if (!lastRan) {
          func.apply(context, args);
          lastRan = Date.now();
        } else {
          clearTimeout(lastFunc);
          lastFunc = setTimeout(function () {
            if ((Date.now() - lastRan) >= limit) {
              func.apply(context, args);
              lastRan = Date.now();
            }
          }, limit - (Date.now() - lastRan));
        }
      }
    };

    const updateZoomThrottled = throttle(function (progress) {
      world.updateZoom(progress);
    }, 4); // Adjust the 100ms to your needs


    ScrollTrigger.create({
      trigger: spacerRef.current,
      start: 'top bottom',
      end: 'bottom bottom',
      onEnter: () => world.enableZoom(), // Enable zooming
      onLeave: () => world.disableZoom(), // Disable zooming
      onEnterBack: () => world.enableZoom(), // Enable zooming
      onLeaveBack: () => world.disableZoom(), // Disable zooming
      onUpdate: self => {
        updateZoomThrottled(self.progress);

      },
    });


    // locating on model
    // Los Angeles
    world.findLocation(34.0522, -118.2437, world.earth, 0.2);

    // New York
    world.findLocation(40.7128, -74.0060, world.earth, 0.14);





  }, []);

  useEffect(() => {
    // Define a ScrollTrigger for the spacer section
    ScrollTrigger.create({
      trigger: spacerRef.current,
      start: 'top top',
      // Set the end trigger to 50% of the spacerRef's bottom.
      // This means contactDetailsRef scrolling will end when the user reaches the middle of spacerRef.
      end: 'bottom bottom',
      onUpdate: self => {
        // Calculate the scroll position based on the progress within the spacer section
        const maxScroll = contactDetailsRef.current.scrollHeight - contactDetailsRef.current.offsetHeight;
        // Adjust scrollPos calculation to account for the early end of the scroll animation
        const scrollPos = self.progress * maxScroll * 2; // Multiplied by 2 because we end at 50%

        // Scroll the contactDetailsRef to the calculated position
        contactDetailsRef.current.scrollTop = scrollPos;
      }
      // No scroller property needed since we're listening to the window scroll by default.
    });

    // Clean up function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []); // Include dependencies if there are any


  useEffect(() => {



    ScrollTrigger.create({
      trigger: projectWrapperRefOuter.current,
      start: "bottom bottom",
      end: "bottom top",
      onEnter: () => stopLenis(),
      onLeaveBack: () => startLenis(),
      snap: {
        snapTo: 1,
        duration: 2, delay: 0.5, ease: "power3.inOut",
        directional: false

      }
    });

  }, [startLenis, stopLenis, projectWrapperRefOuter]);



  const [activeId, setActiveId] = useState(0);

  const setActiveElementOnHover = (id) => {
    setActiveId(id);
  };

  return (

    <>
      <div id="work" className="section">

        <div ref={projectWrapperRefOuter} className={styles.projectWrapperOuter} id='your-anchor-2'>
          <div ref={textRef2} className={styles.scrollText2}>
          {projects.slice(0, displayedProjects).map(({ id, title, details, img, src, tags }) => (
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
                      id={{id}} // Use a unique identifier for each video
                      width="800" // Width of the video player
                      height="450" // Height of the video player
                      style={{ width: '100%' }} // Set the width to 100% to make it responsive
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
          {/* "View More" Button */}
          {isMobileDevice && displayedProjects < projects.length && (
            <div className={styles.viewMore}>
            <button onClick={loadMoreProjects} className={styles.viewMoreButton}>
              View More
            </button>
            </div>
          )}

        </div>
      </div>
      <div ref={spacerwRef} className={styles.spacerw}></div>

      <div id="contact" className="section isDark" style={{ position: 'relative', height: 'auto' }}>

        <div ref={WorldRef} className={`${styles.worldContainer} ${fadeIn ? styles.fadeIn : ''}`}>

        </div>


        <div ref={childWrapperRef} className={styles.worldOverlay}>


          <div className={styles.contactWrap}>
            <div className={styles.contactDetails} ref={contactDetailsRef}>
              <div className={styles.contactScroll}>
                A right hand to strategy, our team is both innovative and insightful, offering end to end solutions that streamline and maximize clients vision, resources, and impact
                <div className={styles.bah} style={{ textAlign: 'left' }}>
                  <h4>Production Services</h4>
                  <ul>
                    <li>Production – LA + NYC (and available to travel)</li>
                    <li>Post Production</li>
                    <li>Post Production Management </li>
                  </ul>
                  <h4>Creative Services</h4>
                  <ul>
                    <li>Retouching </li>
                    <li>Motion Editing</li>
                    <li>Music Directing / Supervision</li>
                    <li>Creative Services</li>
                    <li>Creative Direction </li>
                    <li>Art Direction</li>
                    <li>Project Management</li>
                    <li>Social Content Strategy + Management </li>
                  </ul>
                </div>
              </div>
            </div>


          </div>



        <div className={styles.footer}>
        <div className={styles.contactInfo}>
              <div className={styles.infoSection}>
                <h4>ST. STUDIO INC</h4>
                <p>135 #01 Beverlv Blvd<br />
                  Los Angeles CA, 90036<br />
                </p>
              </div>
              <div className={`${styles.hideMd} ${styles.infoSection}`}>
                <h4>GENERAL</h4>
                <p>
                  310 990 0000<br />
                  <a href="mailto:00@ST.STUDIO">00@ST.STUDIO</a>
                </p>
              </div>
              <div className={`${styles.infoSection} ${styles.bahbah}`}>

                <h4>STUDIO MANAGER</h4>
                <p>
                  Camille Waterfallen<br />
                  <a href="mailto:CW@ST.STUDIO">CW@ST.STUDIO</a>
                </p>
              </div>

            </div>
              </div>

      </div>
        <div ref={spacerRef} className={styles.spacer}></div>

      </div>

    </>


  );
};

export default HomePage;