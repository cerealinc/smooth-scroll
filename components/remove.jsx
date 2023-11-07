import React, { useState, useEffect, useRef } from 'react';
import styles from './style.module.css';

const projects = [
  {
    id: 'one',
    title: 'Miramax',
    details: '<span>Creative Direction</span> <span>Development</span> <span>Production</span>',
    src: 'HBH_HSN_15_FINAL_16x9_UPDATE_v01.mp4',
  },
  {
    id: 'two',
    title: 'New Era',
    details: '<span>Creative Direction</span> <span>Development</span> <span>Production</span>',
    src: 'HBH_Energy_15_FINAL_16x9_UPDATE_v01.mp4',
  },
  {
    id: 'three',
    title: 'Walmart',
    details: '<span>Creative Direction</span> <span>Production</span>',
    src: 'HBH_HSN_15_FINAL_16x9_UPDATE_v01.mp4',
  },
];

export default function Index() {
  const [prevX, setPrevX] = useState(null);
  const [prevY, setPrevY] = useState(null);
  const [speed, setSpeed] = useState(0);
  let linkHovered = false;
  const canvasRef = useRef(null);
  const videoRefs = useRef([]);

  // Function to pixelate an image
  const pixelate = (image, pixelSize) => {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

    const scaledWidth = image.width / pixelSize;
    const scaledHeight = image.height / pixelSize;

    ctx.drawImage(canvas, 0, 0, scaledWidth, scaledHeight);
    ctx.drawImage(canvas, 0, 0, scaledWidth, scaledHeight, 0, 0, image.width, image.height);

    return canvas.toDataURL();
  };

  // useEffect to update the canvas with the pixelated frame
  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas && videoRefs.current[selectedProject]) {
      const video = videoRefs.current[selectedProject];
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Pixelate the frame (adjust pixelSize as needed)
      const pixelSize = 10;
      const pixelatedDataUrl = pixelate(video, pixelSize);
      const pixelatedImage = new Image();
      pixelatedImage.src = pixelatedDataUrl;
      pixelatedImage.onload = () => {
        ctx.drawImage(pixelatedImage, 0, 0, canvas.width, canvas.height);
      };
    }
  }, [selectedProject]);

  // ... your existing code

  return (
    <div ref={container} className={styles.projects}>
      <div className={styles.projectDescription}>
        <div className={styles.imageContainer}>
          <div class="focus focus--front">
            {projects.map(({ id, src }) => (
              <video
                ref={(el) => (videoRefs.current[id] = el)} // Store video refs
                loop
                muted
                autoPlay
                playsInline
                key={id}
                className={styles.video}
                style={{
                  display: activeId === id ? 'block' : 'none',
                }}
              >
                <source src={`/images/${src}`} type="video/mp4" />
              </video>
            ))}
          </div>
          <div class="focus__circle"></div>
        </div>
      </div>
      <div className={styles.projectListWrap} data-scroll data-scroll-speed="0.3">
        <div className={styles.projectList}>
          <h3 className={projectClasses}>SELECT BRANDS</h3>
          {projects.map(({ id, title, details }) => (
            <div
              className={`${activeId === id ? styles.hover : ''} ${styles.projectEl}`}
            >
              <h2
                key={id}
                className={projectClasses}
                onMouseEnter={() => [setActiveElementOnHover(id), handleProjectHover()]}
              >
                {title}
              </h2>
              <p
                style={{
                  opacity: activeId === id ? '1' : '0',
                }}
                dangerouslySetInnerHTML={{ __html: details }}
              ></p>
            </div>
          ))}
        </div>
      </div>
      {/* Canvas to display the pixelated video frame */}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
}
