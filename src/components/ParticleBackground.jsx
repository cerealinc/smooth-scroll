import Particles from "react-particles";

import { useMemo, useState } from "react";
import { useCallback } from "react";
import { loadFull } from "tsparticles";

export default function ParticleBackground() {
  const [test, setTest] = useState();

  const particleOptions = {
    particles: {
      number: {
        value: 20,
        density: {
          enable: true,
          area: 1000
        }
      
      },
      color: {
        value: ["#fff", "#000", "#333", "#777"],
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 1
      },
      size: {
        value: { min: 4, max: 10 }
      },
      links: {
        enable: true,
        distance: 150,
        color: "#fff",
        opacity: 1,
        width: 1
      },
      move: {
        enable: true,
        speed: 3,
        direction: "none",
        random: true,
        straight: false,
        outModes: "out"
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab"
        },
        onClick: {
          enable: true,
          mode: "push"
        }
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 1
          }
        },
        push: {
          quantity: 4
        }
      }
    }
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <>
        <Particles options={particleOptions} init={particlesInit} />
    </>
  );
}
