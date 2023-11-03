
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import Link from 'next/link';
import AnimatedLogo from '@/components/AnimatedSection';

import styles from './style.module.css';

const Scroll = () => {
    const [scrollPercentage, setScrollPercentage] = useState(0);

    useEffect(()=>{

        const handleScroll = ()=>{
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollY = window.scrollY;
            
            const scrollPercent = (scrollY / (documentHeight - windowHeight))*100 
    
            setScrollPercentage(scrollPercent)
            console.log(scrollPercent)
        }
    
    
        window.addEventListener("scroll", handleScroll);
    
        return()=>{
            window.removeEventListener("scroll", handleScroll)
        }
    
      },[])
  return (
    <div className={styles.scroll}>
    <div>Scroll</div>

<div
      id="progress-container"
      style={{
        height: "2px",
        width: "100%",
        backgroundColor: "none",
        position: "relative",
        marginTop: "8px",
        left: "0",
        right: "0",
      }}
    >
      <div
        className="progress-fill"
        style={{
          height: "100%",
          backgroundColor: "white",
          width: `${scrollPercentage}%`,
        }}
      >
       
      </div>
    </div>

    </div>

  );
};

export default Scroll;
