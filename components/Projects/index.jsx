import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import styles from './style.module.css';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';


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

export default function Index() {
    const textRef = useRef(null);

    const [prevX, setPrevX] = useState(null);
    const [prevY, setPrevY] = useState(null);
    const [speed, setSpeed] = useState(0);
    let linkHovered = false;
    const [firstHover, setFirstHover] = useState(false);
    const focusFrontRef = useRef(null);

    useEffect(() => {
        const focusFront = focusFrontRef.current;
        const item = textRef.current;
        const itemWidth = item.clientWidth;

        gsap.to(item, {
            y: 60, // Adjust the vertical parallax distance
            scrollTrigger: {
              trigger: container.current,
              start: 'top center',
              end: 'bottom center',
              scrub: true, // Smooth scrolling effect
              markers: false
            },
          });
          gsap.set(item, {
            marginLeft: '100vw', // Start off the screen to the right
          });
      
          const marquee = gsap.to(item, {
            duration: 45,
            ease: 'none',
            x: '-=' + (itemWidth + window.innerWidth), // Animate off the screen to the left
            repeat: -1,
            repeatRefresh: true, // Repeats animation when it reaches the end
            modifiers: {
              x: x => (parseFloat(x) % (itemWidth + window.innerWidth)) + 'px',
            },
          });
        const handleMouseMove = (e) => {
            if (prevX !== null && prevY !== null) {
                const deltaX = e.clientX - prevX;
                const deltaY = e.clientY - prevY;
                const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
                setSpeed(distance);
            }

            setPrevX(e.clientX);
            setPrevY(e.clientY);
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const myNumber = Number(speed);
                // Set up animation here
                let setit = 60; // Set the initial size for the first hover
                focusFront.style = `clip-path: circle(var(--radius) at ${mouseX}px ${mouseY}px);`;

        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };

    }, [speed, prevX, prevY]);

    const [activeId, setActiveId] = useState(0);

    const setActiveElementOnHover = (id) => {
        setActiveId(id);
    };


    const handleProjectHover = () => {
        if (!firstHover) {
            setFirstHover(true); // Set the flag to indicate the first hover
        }
    }
    const [selectedProject, setSelectedProject] = useState(0);
    const container = useRef(null);
    const imageContainer = useRef(null);
    const projectClasses = `${firstHover ? styles.hovered : styles.notHovered}`;
    const focusClasses = `${firstHover ? styles.hovered : styles.notHovered}`;

    return (
        <div className={styles.wrapper}>

        <div ref={container} className={styles.projects}>
        <div className={styles.childWrapper}>
    <div ref={textRef} className={styles.scrollText}>
    Clients Include <span style={{marginLeft: "20vw"}}> Clients Include
</span><span style={{marginLeft: "20vw"}}> Clients Include
</span><span style={{marginLeft: "20vw"}}> Clients Include
</span>
<span style={{marginLeft: "20vw"}}> Clients Include
</span><span style={{marginLeft: "20vw"}}> Clients Include
</span>
    </div>
    </div>
            <div className={styles.projectDescription}>

                <div className={styles.imageContainer}>

                <div ref={focusFrontRef} className={`${styles.focusFront} ${focusClasses}`}>


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
            <div className={styles.projectListWrap} data-scroll data-scroll-speed="0.3">

                <div className={styles.projectList}>

                    {
                        projects.map(({ id, title, details }) => (
                            // eslint-disable-next-line react/jsx-key
                            <div
                                className={`${activeId === id ? styles.hover : ''} ${styles.projectEl}`}
                            >
                                <h2
                                    key={id}
                                    className={projectClasses}
                                    onMouseEnter={() => [setActiveElementOnHover(id), handleProjectHover()]}
                                >

                                    {title}

                                </h2>


                                <p style={{
                                    opacity:
                                        activeId === id ? "1" : "0"
                                }} dangerouslySetInnerHTML={{ __html: details }}></p>
                            </div>
                        ))
                    }
                </div>
            </div>
            </div>
            </div>
    )
}




