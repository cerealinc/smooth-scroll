// Footer.js
import React, { useEffect, useState, useRef } from "react";
import styles from "./style.module.css";
import Image from "next/image";
import gsap from "gsap";

const Footer = ({ handleClick }) => {
  const footerPopupRef = useRef();
  const [activeContact, setActiveContact] = useState(null);
  const [isDarkSectionInView, setIsDarkSectionInView] = useState(false);

  const handleContactPopup = (e) => {
    e.preventDefault();

    const footerPopup = footerPopupRef.current;

    // Check if the footerPopup is already active
    const isPopupActive = footerPopup.classList.contains(styles.active);

    if (isPopupActive) {
      // If active, close the footerPopup
      gsap.to(footerPopup, {
        bottom: -footerPopup.offsetHeight, // Move it out of the viewport
        className: `${styles.footer} ${styles.footerPopup}`, // Remove the 'active' class
        duration: 1.5,
        ease: "power3.inOut",
      });

      setActiveContact(null); // Set activeContact to null as the popup is closed
    } else {
      // If not active, open the footerPopup
      gsap.to(footerPopup, {
        bottom: 0,
        className: `${styles.footer} ${styles.footerPopup} ${styles.active}`, // Add the 'active' class
        duration: 1.5,
        ease: "power3.inOut",
      });

      setActiveContact("contactPopup"); // Set activeContact to 'contactPopup' as the popup is open
    }
  };
// Import useEffect and useState from "react"

useEffect(() => {
  const footerPopup = footerPopupRef.current;

  // Check if the footerPopup is already active
  const isPopupActive = footerPopup.classList.contains(styles.active);

  const checkIfBottom = () => {
    // window.innerHeight + window.scrollY represents the total height scrolled
    // document.body.offsetHeight represents the total height of the body content
    // Adding a small threshold (e.g., 5px) to ensure it works on all browsers
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 35) {

      // If not active, open the footerPopup
      gsap.to(footerPopup, {
        bottom: 0,
        className: `${styles.footer} ${styles.footerPopup} ${styles.active}`, // Add the 'active' class
        duration: 1.5,
        ease: "power3.inOut",
      });

      setActiveContact("contactPopup"); // Set activeContact to 'contactPopup' as the popup is open

    } else {
      // If active, close the footerPopup
      gsap.to(footerPopup, {
        bottom: -footerPopup.offsetHeight, // Move it out of the viewport
        className: `${styles.footer} ${styles.footerPopup}`, // Remove the 'active' class
        duration: 1,
        ease: "power3.inOut",
      });

      setActiveContact(null); // Set activeContact to null as the popup is closed
    }
  };

  // Add scroll event listener
  window.addEventListener('scroll', checkIfBottom);

  // Cleanup function to remove event listener
  return () => window.removeEventListener('scroll', checkIfBottom);
}, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.classList.contains("isDark")) {
            setIsDarkSectionInView(entry.isIntersecting);
          }
        });
      },
      {
        threshold: 0,
      }
    );

    const darkSection = document.querySelector(".isDark");
    if (darkSection) {
      observer.observe(darkSection);
    }

    return () => {
      if (darkSection) {
        observer.unobserve(darkSection);
      }
    };
  }, []);

  const textColor = isDarkSectionInView ? "isBlack" : "isWhite";
  return (
    <div className={styles[textColor]}>

      <a
        onClick={(e) => handleContactPopup(e, "contactPopup")}
        className={
          activeContact === "contactPopup"
            ? styles.contactActive
            : styles.contactInActive
        }
      >
        Contact
      </a>
      <div
        ref={footerPopupRef}
        className={`${styles.footer} ${styles.footerPopup}`}
      >
        <div
          className={
            activeContact === "contactPopup"
              ? styles.closeOverlayActive
              : styles.closeOverlayInActive
          }
          onClick={(e) => handleContactPopup(e, "contactPopup")}
        >

        </div>
        <span
          className={styles.close}
          onClick={(e) => handleContactPopup(e, "contactPopup")}
        >
          X
        </span>
        <div className={styles.contactInfo}>
          <div className={styles.infoSection}>
            <div className={styles.infoSectionLarge}>
              <a href="mailto:00@ST.STUDIO">00@ST.STUDIO</a>
            </div>
          </div>

          <div className={`${styles.infoSection} ${styles.infoSectionSmall}`}>
          <div className={styles.instagram}>
              <a
                className={styles.socialLink}
                href="https://instagram.com/st.studio"
                target="_blank"
              >
                INSTAGRAM
                <Image src="/arrow.png" height={8} width={8} alt="Instagram" />
              </a>
            </div>

            <div className={styles.studioManager}>
              <h4>STUDIO MANAGER</h4>
              <p>
                Camille Waterfallen
                <br />
                <a href="mailto:CW@ST.STUDIO">CW@ST.STUDIO</a>
              </p>
            </div>
            <div className={styles.studioAddress}>
              <h4 className={styles.contactLogo}>
                ST<span className={styles.logoline}></span>STUDIO
              </h4>
              <p>
              3336 S La Cienega Blvd<br />
Ste. 153<br />
LA CA 90016
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
