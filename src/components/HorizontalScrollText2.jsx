import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HorizontalScrollText2 = () => {
  const textRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Create a timeline for the text animation
    const textTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top+=100 center', // Add a 200px buffer above the start marker
        end: 'bottom+=300 center',
        scrub: 1,
        markers: false,
      },
    });

    textTimeline.to(textRef.current, { x: '-135%', duration: 1 });

    // Create a ScrollTrigger for pinning the video
    ScrollTrigger.create({
      trigger: videoRef.current,
      start: 'top top', // Pin when the video reaches the top
      endTrigger: textRef.current,
      end: 'top top', // Unpin when the text is at the top
      pin: true,
      pinSpacing: true,
      markers: false,
    });

    // Create a ScrollTrigger to reveal the next section
    ScrollTrigger.create({
      trigger: textRef.current,
      start: 'top bottom', // When the text is at the bottom of the viewport
      endTrigger: textRef.current, // Use the same trigger
      end: 'bottom bottom', // Until the text is at the bottom of the viewport
      toggleActions: 'play none none none',
      markers: false,      
    });

    return () => {
      textTimeline.kill();
      ScrollTrigger.getById(textRef.current).kill(true);
      ScrollTrigger.getById(videoRef.current).kill(true);
    };
  }, []);

  return (
    <div ref={videoRef} className='horizontal-scroll-container'>
      <div className="horizontal-scroll-header">
        A right hand to strategy
      </div>
      <div ref={textRef} className="horizontal-scroll-text">
        Specializing in creaive direct and development for agencies, brands, and start-ups.
      </div>
      <div className="horizontal-scroll-video">
        <video
          loop
          muted
          autoPlay
          playsInline
          className="videoInner"
        >
          <source src="/images/ST_2020_ActiveReel_5.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default HorizontalScrollText2;
