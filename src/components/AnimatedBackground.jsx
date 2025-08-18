"use client";

import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


export default function AnimatedBackground() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="animated-background"
      init={particlesInit}
      options={{
        fullScreen: false, // restrict to parent container
        background: {
          color: "transparent", // no background, only particles
        },
        fpsLimit: 60,
        particles: {
          number: { value: 50, density: { enable: true, area: 800 } },
          color: { value: ["#4F46E5", "#3B82F6", "#10B981"] },
          shape: { type: "circle" },
          opacity: { value: 0.4 },
          size: { value: { min: 2, max: 6 } },
          links: { enable: true, distance: 120, color: "#ffffff", opacity: 0.2, width: 1 },
          move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            random: true,
            straight: false,
            outModes: "bounce",
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { quantity: 4 },
          },
        },
        detectRetina: true,
      }}
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
}
