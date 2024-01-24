'use client';
import React, {useState} from 'react';
import Logo from '../components/Logo';
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
      setFadeOut(false);
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';

    } else {
      setFadeOut(true);
      setTimeout(() => {
        setRenderMain(false);
        document.body.style.overflow = '';
        document.body.style.height = '';
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
      ? { lerp: 0.9, syncTouch: true } // Adjust these values for mobile
      : { lerp: 0.1, smoothTouch: true }; // Default values for non-mobile
  
  const fadeClass = renderMain ? (fadeOut ? 'fadeOut' : 'fadeIn') : '';

  return (
    <ReactLenis root options={lenisOptions}>
      <Logo />
      <Nav handleClick={handleClick} />  
      <div id="home" className="section">
        <Intro />
      </div>
      <HomePage />
    </ReactLenis>

  )
}
