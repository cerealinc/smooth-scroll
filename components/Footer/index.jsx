// Footer.js
import React, { useRef } from 'react';
import styles from "./style.module.css";
import Image from "next/image";
import gsap from 'gsap';

const Footer = ({ animateFooter }) => {
  const footerPopupRef = useRef()

  // Function to animate Y to 100 using gsap
  const animateYTo100 = () => {
    gsap.to(footerPopupRef.current, {
      y: 100,
      duration: 1,
      ease: 'power3.inOut',
    });
  };

  // Call the animateYTo100 function when animateFooter is true
  if (animateFooter) {
    animateYTo100();
  }

  return (
    <footer>
      <div ref={footerPopupRef} className={`${styles.footer} ${styles.footerPopup}`}>


<div className={styles.contactInfo}>
  <div className={styles.infoSection}>
    <div className={styles.infoSectionLarge}>
      <a href="mailto:00@ST.STUDIO">00@ST.STUDIO</a>
    </div>
  </div>

  <div className={`${styles.infoSection} ${styles.infoSectionSmall}`}>
    <div>
      <a
        className={styles.socialLink}
        href="https://instagram.com/st.studio"
        target="_blank"
      >
        INSTAGRAM
        <Image
          src="/arrow.png"
          height={8}
          width={8}
          alt="Instagram"
        />
      </a>
    </div>
    <div>
      <h4>STUDIO MANAGER</h4>
      <p>
        Camille Waterfallen
        <br />
        <a href="mailto:CW@ST.STUDIO">CW@ST.STUDIO</a>
      </p>
    </div>
    <div>
      <h4 className={styles.contactLogo}>
        ST<span className={styles.logoline}></span>STUDIO
      </h4>
      <p>
        135 #01 Beverlv Blvd
        <br />
        Los Angeles CA, 90036
        <br />
      </p>
    </div>
  </div>
</div>
</div>
    </footer>
  );
};

export default Footer;
