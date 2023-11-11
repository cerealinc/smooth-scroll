import React, { useEffect, useRef, useState } from 'react';
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
  const textRef = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const wrapperRef = useRef(null);
  const projectWrapperRef = useRef(null);
  const scrollContainerRef = useRef(null); // Add a new ref for the scroll container
  const [firstHover, setFirstHover] = useState(false);

  const focusFrontRef = useRef(null);

  useEffect(() => {
      const focusFront = focusFrontRef.current;
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

    const item3 = textRef3.current;
    const itemWidth3 = item3.clientWidth;

    gsap.set(item3, {
      marginLeft: '100vw',
    });

    const marquee3 = gsap.to(item3, {
      duration: 45,
      ease: 'none',
      x: '-=' + (itemWidth3 + window.innerWidth),
      repeat: -1,
      repeatRefresh: true,
      modifiers: {
        x: x => (parseFloat(x) % (itemWidth3 + window.innerWidth)) + 'px',
      },
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom center',
      pin: true,
      pinSpacing: true,
      markers: false,
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
          console.log(blurAmount)
          gsap.set(videoRef.current, { filter: `blur(${blurAmount}px)` });
          gsap.to(textRef.current, { y: `${blurAmount}` }); // Adjust the duration for video fade

        },

      },
    });
    gsap.to(videoRef.current, {
      scrollTrigger: {
        trigger: videoRef.current,
        start: 'top center',
        end: 'center top',
        scrub: true,
        markers: false,
        onUpdate: (self) => {
          const blurAmount = 64 - self.progress * 64;
          console.log(blurAmount)
          gsap.to(videoRef.current, { opacity: `${blurAmount}` }); // Adjust the duration for video fade
        }
      },
    });
    ScrollTrigger.create({
      trigger: projectWrapperRef.current,
      start: 'top center',
      end: 'top-=300 top',
      scrub: true,
        markers: false,
      onUpdate: (self) => {
        const blurAmount = 64 - self.progress * 64;
        console.log(blurAmount)
        gsap.to(textRef2.current, { y: `${blurAmount}` }); // Adjust the duration for video fade
      }
    });
  }, []);
  const handleProjectHover = () => {
    if (!firstHover) {
        setFirstHover(true); // Set the flag to indicate the first hover
    }
}
  const [activeId, setActiveId] = useState(0);

  const setActiveElementOnHover = (id) => {
      setActiveId(id);
  };

  const focusClasses = `${firstHover ? styles.hovered : styles.notHovered}`;

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
    Select Clients Include <span style={{marginLeft: "20vw"}}>Select Clients Include
</span><span style={{marginLeft: "20vw"}}>Select Clients Include
</span><span style={{marginLeft: "20vw"}}>Select Clients Include
</span><span style={{marginLeft: "20vw"}}>Select Clients Include
</span>
    </div>
    <div className={styles.ugh}>  </div>
    <div className={styles.projectDescription}>

<div className={styles.imageContainer}>

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

    <div ref={textRef3} className={styles.projectList} style={{display: 'none'}}>

{
    projects.map(({ id, title, details }) => (
        // eslint-disable-next-line react/jsx-key
        <div
            className={`${styles.projectEl}`}
        >
            <h2
                key={id}
                onMouseEnter={() => [setActiveElementOnHover(id), handleProjectHover()]}
            >

                {title},

            </h2>

        </div>
    ))
}
{
    projects.map(({ id, title, details }) => (
        // eslint-disable-next-line react/jsx-key
        <div
            className={`${styles.projectEl}`}
        >
            <h2
                key={id}
                onMouseEnter={() => [setActiveElementOnHover(id), handleProjectHover()]}
            >

                {title},

            </h2>

        </div>
    ))
}
{
    projects.map(({ id, title, details }) => (
        // eslint-disable-next-line react/jsx-key
        <div
            className={`${styles.projectEl}`}
        >
            <h2
                key={id}
                onMouseEnter={() => [setActiveElementOnHover(id), handleProjectHover()]}

            >

                {title},

            </h2>

        </div>
    ))
}
{
    projects.map(({ id, title, details }) => (
        // eslint-disable-next-line react/jsx-key
        <div
            className={`${styles.projectEl}`}
        >
            <h2
                key={id}
                onMouseEnter={() => [setActiveElementOnHover(id), handleProjectHover()]}

            >

                {title},

            </h2>

        </div>
    ))
}
</div>
</div>

    </div>

  );
};

export default HorizontalScrollText2;
