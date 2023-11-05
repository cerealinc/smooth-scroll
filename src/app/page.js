'use client';
import React, { useEffect, useRef } from 'react';
import styles from './page.module.css'
import Projects from '../components/Projects/index';
import Logo from '@/components/Logo';
import HorizontalScrollText2 from '@/components/HorizontalScrollText2/index'; 
import Nav from '@/components/Nav'; 
import Scroll from '@/components/Scroll'; 
import HorizontalScrollText from '@/components/HorizontalScrollText';
import HorizontalScrollText3 from '@/components/HorizontalScrollText3';
import { useInView } from 'react-intersection-observer';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'


export default function Home() {
  const targetRef = useRef(null);
  const elementToCheckRef = useRef(null);
  const lenis = useLenis(({ scroll }) => {
    duration: 2
  })


  return (
    <ReactLenis root>
        <Logo />
        <Nav />
        <Scroll />
        <HorizontalScrollText />
        <div id="nextSection">
        <HorizontalScrollText2 /></div>
        <div className="lightbg">
        <HorizontalScrollText3 />
        </div>
        <Projects />
      </ReactLenis>

  )
}
