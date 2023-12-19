'use client';
import React, { useRef, useState, useEffect } from 'react';
import styles from './page.module.css'
import Projects from '../components/Projects/index';
import Logo from '../components/Logo';
import TextReveal from '../components/HorizontalScrollText2'; 
import Nav from '../components/Nav'; 
import Scroll from '../components/Scroll'; 
import HorizontalScrollText from '../components/HorizontalScrollText';
import HorizontalScrollText3 from '../components/HorizontalScrollText3';
import { useInView } from 'react-intersection-observer';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import CursorCircle from '../components/Cursor';
import Main from '@/components/main';


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
    <ReactLenis root>
      <Logo />
      <Nav handleClick={handleClick} />
      {renderMain && (
        <div className={`world-container ${fadeClass}`}>
          <Main />
        </div>
      )}
      <Scroll />
      <HorizontalScrollText />
      <TextReveal />
    </ReactLenis>

  )
}
