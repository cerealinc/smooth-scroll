'use client';
import { useEffect } from 'react';
import styles from './page.module.css'
import Intro from '../components/Intro';
import Description from '../components/Description';
import Projects from '../components/Projects/index';
import Logo from '@/components/Logo';
import CustomCursor from "../components/CustomCursor";
import CustomCursorManager from "../components/CustomCursor/context/manager";
import Start from '@/components/Start'; 
import TextScrollAuto from '@/components/textScrollAuto';

export default function Home() {

  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll(
            {
              smooth: true,
              lerp: 0,
              getSpeed: true,
              offset: ["30%",0]
            }
          );
          
      }
    )()
  }, [])

  return (

      <main className={styles.main}>
        <Logo />
        <Start />
        <TextScrollAuto />
        <Projects />
      </main>

  )
}
