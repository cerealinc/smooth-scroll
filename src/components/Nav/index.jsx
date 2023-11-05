
import React from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import AnimatedLogo from '@/components/AnimatedSection';

import styles from './style.module.css';

const Nav = () => {

      const manageMouseEnter = (e) => {
        gsap.to(e.target.children, {width: "100%", duration: 0.3})
      }
    
      const manageMouseLeave = (e) => {
        gsap.to(e.target.children, {width: "100%", duration: 0.3, delay: 0.1})
      }
    



  return (
    <div className={styles.navigation}>

<Link onMouseEnter={(e) => {manageMouseEnter(e)}} onMouseLeave={(e) => {manageMouseLeave(e)}} href="">Contact<div className={styles.underline}></div></Link>
<span className={styles.centerLine}></span>
<Link onMouseEnter={(e) => {manageMouseEnter(e)}} onMouseLeave={(e) => {manageMouseLeave(e)}} href="">Home<div className={styles.underline}></div></Link>
    </div>
  );
};

export default Nav;
