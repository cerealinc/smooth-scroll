import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import styles from './style.module.css';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    const [prevX, setPrevX] = useState(null);
    const [prevY, setPrevY] = useState(null);
    const [speed, setSpeed] = useState(0);
    let linkHovered = false;
    useEffect(() => {
        const circle = document.querySelector('.focus__circle');
        const focusFront = document.querySelector('.focus--front');

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

        let setit; // Declare the variable outside of the if-else blocks

        if (myNumber > 20) {
          setit = 140; // Assign the value within the if block
        } else if (myNumber > 40) {
            setit = 200; // Assign the value within the if block
        } else {
          setit = 80; // Assign the value within the else block
        }
        focusFront.style = `clip-path: circle(var(--radius, ${setit}px) at ${mouseX}px ${mouseY}px);`;
        circle.style = `transform: translate(${mouseX}px, ${mouseY}px)`;

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
  
    const [firstHover, setFirstHover] = useState(false);

    const handleProjectHover = () => {
      if (!firstHover) {
        setFirstHover(true); // Set the flag to indicate the first hover
      }
    }
    const [selectedProject, setSelectedProject] = useState(0);
    const container = useRef(null);
    const imageContainer = useRef(null);
    const projectClasses = `${firstHover ? styles.hovered : styles.notHovered}`;

    return (
        <div ref={container} className={styles.projects}>

            <div className={styles.projectDescription}>

                <div className={styles.imageContainer}>
                <div class="focus focus--back">
                {
                            projects.map(({ id, src }) => (
                                <video
                                    loop
                                    muted
                                    autoPlay
                                    playsInline
                                    key={id}
                                    className={styles.videoBlur}
                                    style={{
                                        display:
                                          activeId === id ? "block" : "none",
                                        
                                      }}
                                >
                                    <source src={`/images/${src}`} type="video/mp4" />

                                </video>
                            )
                            )
                    }
                    </div>
                    <div class="focus focus--front">


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
<div class="focus__circle"></div>

                </div>

            </div>
            <div className={styles.projectListWrap} data-scroll data-scroll-speed="0.3">

            <div className={styles.projectList}>
            <h3 className={projectClasses}>SELECT BRANDS</h3>

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
                                      }} dangerouslySetInnerHTML={ { __html: details } }></p>
                        </div>
                    ))
                }
            </div>
            </div>
        </div>
    )
}




