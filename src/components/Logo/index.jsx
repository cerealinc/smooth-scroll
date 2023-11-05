
import React, { useEffect, useRef } from 'react';
import AnimatedLogo from '@/components/AnimatedSection';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './style.module.css';

const Logo = () => {
  const mainRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const logoAnimationw = gsap.timeline({
      scrollTrigger: {
        trigger: ".lightbg",
        start: 'center-=100 top', // Start animation when the top of the logo hits the top of the viewport
        toggleActions: 'play none none reverse',
        markers: false,
        duration: 0
      },
    });


    logoAnimationw.to(mainRef.current, {
      color: "#000"
    });
  }, []);

  return (
    <div className={styles.logo} ref={mainRef}>
        ST.<AnimatedLogo text="STUDIO" />
    </div>
  );
};

export default Logo;
