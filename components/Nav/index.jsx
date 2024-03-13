import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import Logo from "../Logo";
import Image from "next/image"; // Import the Image component
import styles from "./style.module.css";

const Nav = ({ handleClick, setRenderMain }) => {
  const [activeSection, setActiveSection] = useState(null);
  const navRef = useRef(null);
  const [isDarkSectionInView, setIsDarkSectionInView] = useState(false);

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    handleClick(false);

    gsap.to(window, {
      scrollTo: { y: `#${sectionId}`, autoKill: false },
      duration: 2.6,
      ease: "power3.inOut",
    });
  };

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
        threshold: 0.25,
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const sections = document.querySelectorAll(".section");
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
            onClick={(e) => handleLinkClick(e, "home")}
            className={`${styles.homeLink} ${
              activeSection === "home" ? styles.active : styles.inActive
            }`}
          >
            Home
          </a>
          <a
            onClick={(e) => handleLinkClick(e, "work")}
            className={
              activeSection === "work" ? styles.active : styles.inActive
            }
          >
            Work
          </a>
          <a
            onClick={(e) => handleLinkClick(e, "contact")}
            className={
              activeSection === "contact" ? styles.active : styles.inActive
            }
          >
            Info
          </a>
        </div>
      </div>
    </>
  );
};

export default Nav;
