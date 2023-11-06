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
  
  // Adjust the strokeDasharray based on the new SVG size
  const svgSize = 60;
  const circleRadius = 25;
  const circumference = 2 * Math.PI * circleRadius;
  const dashArray = (circumference * calculatedPercentage) / 100;
  const dashOffset = circumference - dashArray;

  // Rest of your code...
 // State to store the cursor's position
 const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

 // Update the cursor's position when the mouse moves
 const handleMouseMove = (e) => {
   setCursorPosition({ x: e.clientX -30, y: e.clientY -30 });
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
      width={svgSize}
      height={svgSize}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
      }}
    >
      <circle cx={svgSize / 2} cy={svgSize / 2} r={circleRadius} stroke="white" strokeWidth="1" fill="transparent" />
      <circle
        cx={svgSize / 2}
        cy={svgSize / 2}
        r={circleRadius}
        stroke="#000"
        strokeWidth="1"
        fill="transparent"
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: dashOffset,
        }}
      />
    </svg>
  );
};

export default CursorCircle;
