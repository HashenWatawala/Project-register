"use client";

import React, { useEffect } from "react";

let stylesInjected = false;

const injectGlobalStyles = () => {
  if (stylesInjected) return;

  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes move-gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  `;
  document.head.appendChild(style);
  stylesInjected = true;
};

const Gradient = ({ children, className = "" }) => {
  useEffect(() => {
    injectGlobalStyles();
  }, []);

  return (
    <div className={`relative group ${className}`}>
      {/* Outer animated glow layer */}
      <div
        className="absolute -inset-2 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-500 
        rounded-xl blur-2xl opacity-75 group-hover:opacity-100 
        transition duration-1000 group-hover:duration-200"
        style={{
          backgroundSize: "200% 200%",
          animation: "move-gradient 4s ease-in-out infinite",
        }}
      ></div>

      {/* Inner animated border with light/dark adaptive background */}
      <div
        className="relative rounded-xl p-0.5 transition-all duration-500"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6)",
          backgroundSize: "200% 200%",
          animation: "move-gradient 4s ease-in-out infinite",
        }}
      >
        <div className="bg-white dark:bg-slate-900 rounded-[10px] p-6 text-gray-800 dark:text-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Gradient;
