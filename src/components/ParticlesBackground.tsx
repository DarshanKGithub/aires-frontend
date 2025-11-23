// src/components/ParticlesBackground.tsx
"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  // Global init (run once per app)
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // Load slim bundle (lightweight)
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // No init/loaded props needed in v3+ — just options
  const options = {
    background: {
      color: {
        value: "#000000",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: { enable: true },
      },
      modes: {
        repulse: {
          distance: 120,
          duration: 0.4,
        },
      },
    },
    particles: {
      number: {
        value: 90,
        density: {
          enable: true,
        },
      },
      color: {
        value: ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981"],
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: { min: 0.1, max: 0.6 },
        animation: {
          enable: true,
          speed: 0.8,
          sync: false,
        },
      },
      size: {
        value: { min: 1, max: 4 },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#3b82f6",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.6,
        direction: "none",
        random: false,
        straight: false,
        outModes: "out",
      },
    },
    detectRetina: true,
  };

  // Render only after init
  if (!init) {
    return null;
  }

  return (
    <Particles
      id="aires-particles"
      options={options as any}  // ← v3+ ONLY uses 'options'
      className="absolute inset-0 -z-10"
    />
  );
}