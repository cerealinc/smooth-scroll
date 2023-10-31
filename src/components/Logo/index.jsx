
import React from 'react';
import AnimatedLogo from '@/components/AnimatedSection';

import styles from './style.module.css';

const Logo = () => {
  return (
    <div className={styles.logo}>
        ST.<AnimatedLogo text="STUDIO" />
    </div>
  );
};

export default Logo;
