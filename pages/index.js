'use client';
import React, {useState, useRef, useEffect} from 'react';
import gsap from 'gsap';
import HomePage from '../components/HomePage';
import Nav from '../components/Nav';
import Intro from '../components/Intro';
import Footer from '../components/Footer';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'


export default function Home() {
  const [renderMain, setRenderMain] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const lenisRef = useRef()

  const handleClick = (shouldRenderMain) => {
    if (shouldRenderMain) {
      setRenderMain(true);

    } else {
      setTimeout(() => {
        setRenderMain(false);
      }, 1000); // Adjust timeout to match the transition duration
    }
  };
  const isMobile = () => {
    // Ensure this runs only on the client side
    if (typeof window !== "undefined") {
      // Simple check for mobile devices
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
    }
    return false; // Default to false if not on the client side
  };


    const lenisOptions = isMobile()
      ? { lerp: 1, duration: 0, smoothTouch: true } // Adjust these values for mobile
      : { lerp: 0.1, duration: 1.5, smoothTouch: true }; // Default values for non-mobile

  const fadeClass = renderMain ? (fadeOut ? 'fadeOut' : 'fadeIn') : '';
  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  const startLenis = () => {
    lenisRef.current?.lenis?.start();
  };

  const stopLenis = () => {
    lenisRef.current?.lenis?.stop();
  };
  return (
    <>
      {isMobile() ? (
        <>
          <Nav handleClick={handleClick} />
          <div id="home" className="section">
            <Intro />
          </div>
          <HomePage startLenis={startLenis} stopLenis={stopLenis} />
        </>
      ) : (
        <ReactLenis root options={lenisOptions}>
          <Nav handleClick={handleClick} ref={lenisRef} autoRaf={false} />
          <div id="home" className="section">
            <Intro />
          </div>
          <HomePage startLenis={startLenis} stopLenis={stopLenis} />
        </ReactLenis>
      )}
    </>
  );
}