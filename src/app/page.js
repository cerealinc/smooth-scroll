'use client';
import { useEffect } from 'react';
import styles from './page.module.css'
import Projects from '../components/Projects/index';
import Logo from '@/components/Logo';
import Start from '@/components/Start'; 
import Nav from '@/components/Nav'; 
import Scroll from '@/components/Scroll'; 
import HorizontalScrollText3 from '@/components/HorizontalScrollText3';

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
        <Nav />
        <Scroll />
        <Start />
        <HorizontalScrollText3 />
        <TextScrollAuto />
        <Projects />
      </main>

  )
}
