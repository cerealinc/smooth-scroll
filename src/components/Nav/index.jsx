
import React from 'react';
import Link from 'next/link';
import AnimatedLogo from '@/components/AnimatedSection';

import styles from './style.module.css';

const Nav = () => {
  return (
    <div className={styles.navigation}>

<Link href="">Contact</Link>
<span className={styles.centerLine}></span>
<Link href="">Home</Link>
    </div>
  );
};

export default Nav;
