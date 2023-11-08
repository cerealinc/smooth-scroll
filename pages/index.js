'use client';
import React, { useEffect, useRef } from 'react';
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


export default function Home() {
  const targetRef = useRef(null);
  const elementToCheckRef = useRef(null);
  const lenis = useLenis(({ scroll }) => {
    duration: 2
  })


  return (
    <ReactLenis root>
              <CursorCircle />

        <Logo />
        <Nav />
        <Scroll />
        <HorizontalScrollText />
        <div id="nextSection">
        <TextReveal />
</div>
        <Projects />

      </ReactLenis>

  )
}
