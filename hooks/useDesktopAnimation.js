import { useEffect } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/dist/SplitText';

export const useDesktopAnimation = () => {
  useEffect(() => {
    // Check if running in the browser
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(SplitText);
    const isDesktop = () => window.innerWidth > 1024; // Or any other threshold you prefer

    if (isDesktop()) {
      
      const flexItems = document.querySelectorAll('.flexItemWorks');
      
      flexItems.forEach((flexItem) => {
        const projectDetails = flexItem.querySelector('.projectDetails p');
        if (projectDetails) {
          const splitText = new SplitText(projectDetails, { type: 'chars' });
          gsap.set(splitText.chars, { opacity: 0, y: 3 });

          const tl = gsap.timeline({ paused: true });
          tl.to(splitText.chars, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.inOut',
            stagger: { amount: 0.5 },
            force3D: true,
          });

          const onMouseEnter = () => tl.play();
          const onMouseLeave = () => tl.reverse();
          flexItem.addEventListener('mouseenter', onMouseEnter);
          flexItem.addEventListener('mouseleave', onMouseLeave);

          // Cleanup function
          return () => {
            flexItem.removeEventListener('mouseenter', onMouseEnter);
            flexItem.removeEventListener('mouseleave', onMouseLeave);
          };
        }
      });
    }
  }, []);
};
