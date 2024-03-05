import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import Logo from '../Logo';
import Image from 'next/image'; // Import the Image component
import styles from './style.module.css';

const Nav = ({ handleClick, setRenderMain }) => {
  const footerPopupRef = useRef(null);
  const [activeSection, setActiveSection] = useState(null);
  const [activeContact, setActiveContact] = useState(null);
  const navRef = useRef(null);
  const [isDarkSectionInView, setIsDarkSectionInView] = useState(false);

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    handleClick(false);

    gsap.to(window, {
      scrollTo: { y: `#${sectionId}`, autoKill: false },
      duration: 2.6,
      ease: 'power3.inOut',
    });
  };

  const handleContactPopup = (e, sectionId) => {
    e.preventDefault();
    handleClick(false);

    const footerPopup = footerPopupRef.current;

    // Check if the footerPopup is already active
    const isPopupActive = footerPopup.classList.contains(styles.active);

    if (isPopupActive) {
      // If active, close the footerPopup
      gsap.to(footerPopup, {
        bottom: -footerPopup.offsetHeight, // Move it out of the viewport
        className: `${styles.footer} ${styles.footerPopup}`, // Remove the 'active' class
        duration: 1.5,
        ease: 'power3.inOut',
      });

      setActiveContact(null); // Set activeContact to null as the popup is closed
    } else {
      // If not active, open the footerPopup
      gsap.to(footerPopup, {
        bottom: 0,
        className: `${styles.footer} ${styles.footerPopup} ${styles.active}`, // Add the 'active' class
        duration: 1.5,
        ease: 'power3.inOut',
      });

      setActiveContact('contactPopup'); // Set activeContact to 'contactPopup' as the popup is open
    }
  };


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.classList.contains('isDark')) {
          setIsDarkSectionInView(entry.isIntersecting);
        }
      });
    }, {
      threshold: 0.25,
    });

    const darkSection = document.querySelector('.isDark');
    if (darkSection) {
      observer.observe(darkSection);
    }

    return () => {
      if (darkSection) {
        observer.unobserve(darkSection);
      }
    };
  }, []);

  const textColor = isDarkSectionInView ? 'isBlack' : 'isWhite';

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, {
      threshold: 0.1,
    });

    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <div className={styles.navigation}>
        <Logo />
        <div className={`${styles.menu} ${styles[textColor]}`} ref={navRef}>
          <a
            onClick={(e) => handleLinkClick(e, 'home')}
            className={`${styles.homeLink} ${activeSection === 'home' ? styles.active : styles.inActive}`}
          >
            Home
          </a>
          <a onClick={(e) => handleLinkClick(e, 'work')} className={activeSection === 'work' ? styles.active : styles.inActive}>
            Work
          </a>
          <a onClick={(e) => handleLinkClick(e, 'contact')} className={activeSection === 'contact' ? styles.active : styles.inActive}>
            Info
          </a>
          <a onClick={(e) => handleContactPopup(e, 'contactPopup')} className={activeContact === 'contactPopup' ? styles.active : styles.inActive}>
            Contact
          </a>
        </div>
      </div>

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
    </>
  );
};

export default Nav;
