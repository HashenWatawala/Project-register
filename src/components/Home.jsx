"use client";

import React, { useState, useEffect } from "react";

// Triangle component (white or black triangle depending on theme)
const Triangle = ({ style, fillColor }) => (
  <div
    className="absolute w-4 h-4 rotate-45 opacity-30"
    style={{
      ...style,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 40H0L20 0Z' fill='${fillColor}'/%3E%3C/svg%3E")`,
      backgroundSize: "cover",
    }}
  ></div>
);

const TriangleBackground = ({ fillColor }) => {
  const [triangles, setTriangles] = useState([]);

  useEffect(() => {
    const triangleCount = 40;
    const tempTriangles = Array.from({ length: triangleCount }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 20 + 10}s`,
      animationDelay: `${Math.random() * 10}s`,
      transform: `scale(${Math.random() * 0.5 + 0.5}) rotate(${Math.random() * 360}deg)`
    }));
    setTriangles(tempTriangles);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {triangles.map((t, i) => (
        <Triangle
          key={i}
          style={{
            left: t.left,
            top: t.top,
            animation: `floatTriangle ${t.animationDuration} ease-in-out infinite`,
            animationDelay: t.animationDelay,
            transform: t.transform,
          }}
          fillColor={fillColor}
        />
      ))}

      {/* Optional center blur orb */}
      <div className="absolute top-1/2 left-1/2 w-[60vmin] h-[60vmin] bg-cyan-400/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />

      {/* Animation style */}
      <style>{`
        @keyframes floatTriangle {
          0% { transform: translateY(0) scale(1) rotate(0deg); }
          50% { transform: translateY(-20px) scale(1.05) rotate(180deg); }
          100% { transform: translateY(0) scale(1) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default function TriangleBackgroundView() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);

    const observer = new MutationObserver(() => {
      const newDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(newDark);
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`relative w-full h-screen overflow-hidden transition-colors duration-500 ${
        isDarkMode ? "bg-[#0f172a] text-white" : "bg-white text-black"
      }`}
    >
      <TriangleBackground fillColor={isDarkMode ? "white" : "black"} />
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold md:text-6xl lg:text-8xl">
            Welcome to project rights!
          </h1>
          <p className="mt-4 text-lg md:text-xl text-slate-600 dark:text-slate-300">
            Randomly floating triangle pattern with parallax effect.
          </p>
        </div>
      </div>
    </div>
  );
}
