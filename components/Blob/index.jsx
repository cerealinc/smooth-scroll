import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MorphSVGPlugin } from "gsap/dist/MorphSVGPlugin.js";

const MorphingBlob = () => {
    const pathRef = useRef(null); // This ref should be attached to the path

    const paths = [
        "m464.03,182.77c0,128-109.69,223.33-231.77,231.77S.5,310.77.5,182.77,105.64,18.98,232.27,2.85c126.98-16.18,231.77,51.92,231.77,179.92Z",
        "m492.05,177.97c16.36,106.88-268.51,264.6-352.89,202.3C36.17,304.24-58.11,186.48,45.34,111.09,128.68,50.36,200.42-47.25,303.84,27.57c101.08,73.13,168.85,23.86,188.21,150.39Z",
        "M479.64,222.36c106.54,72.16-184.88,123.59-306.96,132.03C67.12,328.86,-14.9,222.36,-94.78,119.07C-174.78,16.07,81.25,-41.42,217.87,12.44c136.98,53.86,175.83,90.82,261.77,209.92Z",
        "M479.64,222.36c106.54,72.16-184.88,123.59-306.96,132.03C67.12,328.86,-14.9,222.36,-94.78,119.07C-174.78,16.07,81.25,-41.42,217.87,12.44c136.98,53.86,175.83,90.82,261.77,209.92Z",

        // Add more paths if needed
    ];


    useEffect(() => {
        gsap.registerPlugin(MorphSVGPlugin);

        // Animation sequence
        const tl = gsap.timeline({
            repeat: -1,
            yoyo: true,
            defaults: { duration: 6, ease: "power1.inOut" }
        });

        // Loop through the paths and create a tween for each
        paths.forEach((path) => {
            tl.to(pathRef.current, { morphSVG: path });
        });
    }, [paths]); // Include 'paths' in the dependency array to suppress the ESLint warning
    const scaleFactor = 1; // Adjust this value to scale the path up or down

    return (
        <svg width="100vw" height="80vh" viewBox="0 0 600 600">
            <defs>


    <radialGradient id="grad1" cx="233.04" cy="198.03" fx="233.04" fy="198.03" r="215.75" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#ab704d" stop-opacity=".1"/>
      <stop offset=".74" stop-color="#1a1617" stop-opacity="0"/>
    </radialGradient>
            </defs>
            <g transform="translate(0,0)">
                <path ref={pathRef} fill="url(#grad1)" d={paths[0]} />
            </g>
        </svg>
    );

};

export default MorphingBlob;