import React, { useEffect, useState } from 'react';

const CursorCircle = () => {


    const [scrollPercentage, setScrollPercentage] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollY = window.scrollY;
  
        const scrollPercent = (scrollY / (documentHeight - windowHeight)) * 100;
  
        setScrollPercentage(scrollPercent);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const calculatedPercentage = Math.min(scrollPercentage, 100); // Ensure it doesn't go over 100%
    const dashOffset = 283 - (283 * calculatedPercentage) / 100;


  // State to store the cursor's position
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Update the cursor's position when the mouse moves
  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    // Add a mousemove event listener to track cursor position
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (

    <svg
      width="100"
      height="100"
      style={{
        position: 'fixed',
        pointerEvents: 'none', // Make the SVG ignore mouse events
        zIndex: 9999, // Ensure it's on top of other elements
        transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`, // Move the SVG to the cursor's position
      }}
    >    <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="4" fill="transparent" />
    <circle
      cx="50"
      cy="50"
      r="45"
      stroke="#333"
      strokeWidth="4"
      fill="transparent"
      style={{
        strokeDasharray: 283, // 2 * π * r
        strokeDashoffset: dashOffset
      }}
    />
  </svg>

  );
};

export default CursorCircle;



