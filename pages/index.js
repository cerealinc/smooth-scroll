'use client';
import React, {useState} from 'react';
import Logo from '../components/Logo';
import HomePage from '../components/HomePage'; 
import Nav from '../components/Nav'; 
import ScrollMarker from '../components/ScrollMarker'; 
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

  const fadeClass = renderMain ? (fadeOut ? 'fadeOut' : 'fadeIn') : '';

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 2, smoothTouch: true }}>
      <Logo />
      <Nav handleClick={handleClick} />
    <div className={`world-container ${renderMain ? 'fadeIn' : ''}`}>
          <Contact />
        </div>
  
      <ScrollMarker />
      <Intro />
      <HomePage />
    </ReactLenis>

  )
}
