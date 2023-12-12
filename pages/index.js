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

  // Function to handle the click event on the link
  const handleClick = () => {
    setRenderMain(true); // Set renderMain state to true when the link is clicked
    document.body.style.overflow = 'hidden'; // Prevent scrolling

  };
  const targetRef = useRef(null);
  const elementToCheckRef = useRef(null);
  const lenis = useLenis(({ scroll }) => {
    lerp: .6
  })


  return (
    <ReactLenis root>
        <Logo />
        <Nav handleClick={handleClick} />
        {renderMain && <Main />}
        <Scroll />
        <HorizontalScrollText />
        <TextReveal />
      </ReactLenis>

  )
}
