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
  const textRef4 = useRef(null);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const wrapperRef = useRef(null);
  const projectWrapperRef = useRef(null);
  const scrollContainerRef = useRef(null); // Add a new ref for the scroll container
  const [firstHover, setFirstHover] = useState(false);
  const [workInView, setworkInView] = useState(false);

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


    const item4 = textRef4.current;
    const itemWidth4 = item4.clientWidth;

    gsap.set(item4, {
      marginLeft: '100vw',
    });
    const marquee4 = gsap.to(item4, {
      duration: 45,
      ease: 'none',
      x: '-=' + (itemWidth4 + window.innerWidth),
      repeat: -1,
      repeatRefresh: true,
      modifiers: {
        x: x => (parseFloat(x) % (itemWidth4 + window.innerWidth)) + 'px',
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
          gsap.set(videoRef.current, { filter: `blur(${blurAmount}px)` });
          gsap.to(textRef.current, { y: `${blurAmount}` }); // Adjust the duration for video fade

        },

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
        gsap.to(textRef2.current, { y: `${blurAmount}` }); // Adjust the duration for video fade
      }
    });

    marquee4.pause();

    ScrollTrigger.create({
      trigger: projectWrapperRef.current,
      start: 'top-=200 top',
      scrub: true,
      markers: false,
      onEnter: (self) => {
        marquee4.play();
        setworkInView(true); // Set the flag to indicate the first hover
        console.log('Start Marquee')
      },
      onLeave: (self) => {
        marquee4.pause();
        setworkInView(false); // Set the flag to indicate the first hover
        console.log('Pause Marquee')
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
          <div ref={textRef4} className={styles.scrollText4}>
    Select Clients Include <span style={{marginLeft: "20vw"}}>Select Clients Include
</span><span style={{marginLeft: "20vw"}}>Select Clients Include
</span><span style={{marginLeft: "20vw"}}>Select Clients Include
</span><span style={{marginLeft: "20vw"}}>Select Clients Include
</span>
    </div>
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

    <div ref={textRef2} className={styles.scrollText2}>

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
            {workInView ? title : 'clients'},
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

{workInView ? title : 'clients'},

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

{workInView ? title : 'clients'},

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
