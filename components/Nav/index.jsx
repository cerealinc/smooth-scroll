import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import Logo from "../Logo";
import Image from "next/image"; // Import the Image component
import styles from "./style.module.css";


const useWindowHeight = () => {
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    // Function to update the height
    const updateHeight = () => {
      setWindowHeight(window.innerHeight / 3);
    };

    // Update height on mount
    updateHeight();

    // Add event listener for window resize
    window.addEventListener('resize', updateHeight);

    // Clean up
    return () => window.removeEventListener('resize', updateHeight);
  }, []); // Empty array ensures this runs once on mount

  return windowHeight;
};

const Nav = ({ handleClick, setRenderMain }) => {

  const windowHeight = useWindowHeight();

  const [activeSection, setActiveSection] = useState(null);
  const navRef = useRef(null);
  const [isDarkSectionInView, setIsDarkSectionInView] = useState(false);

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    handleClick(false);

    gsap.to(window, {
      scrollTo: { y: `#${sectionId}`, autoKill: false, offsetY: windowHeight},
      duration: 4.4,
      ease: "power4.out",
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
      </div>
    </>
  );
};

export default Nav;
