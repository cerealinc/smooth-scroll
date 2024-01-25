'use client';
import React, {useState} from 'react';
import HomePage from '../components/HomePage'; 
import Nav from '../components/Nav'; 
import Intro from '../components/Intro';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import Contact from '@/components/contact';


export default function Home() {
  const [renderMain, setRenderMain] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

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
      ? { lerp: 0.8, duration: 1.5, smoothTouch: true } // Adjust these values for mobile
      : { lerp: 0.1, duration: 1.5, smoothTouch: true }; // Default values for non-mobile
  
  const fadeClass = renderMain ? (fadeOut ? 'fadeOut' : 'fadeIn') : '';

  return (
    <ReactLenis root options={lenisOptions}>
      <Nav handleClick={handleClick} />  
      <div id="home" className="section">
        <Intro />
      </div>
      <HomePage />
    </ReactLenis>

  )
}
