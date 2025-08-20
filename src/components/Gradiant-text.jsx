"use client";

import React, { ReactNode } from "react";
const gradientKeyframes = `
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-gradient {
  animation: gradient 8s linear infinite;
}
`;
function GradientText({
  children,
  className = "",
  colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
  animationSpeed = 8,
  showBorder = false,
}) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    backgroundSize: "300% 100%",
    animation: `gradient ${animationSpeed}s linear infinite`,
  };
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: gradientKeyframes,
        }}
      />
      <div
        className={`relative inline-flex max-w-max items-center font-normal ... ${className}`}
      >
        {showBorder && (
          <div
            className="absolute inset-0 bg-cover z-0 pointer-events-none"
            style={gradientStyle}
          >
            <div
              className="absolute inset-0 bg-black z-[-1]"
              style={{
                width: "calc(100% - 2px)",
                height: "calc(100% - 2px)",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            ></div>
          </div>
        )}
        <div
          className="inline-block relative z-2 text-transparent bg-cover"
          style={{
            ...gradientStyle,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
const GradientView = () => {
  return (
    <div className="text-2xl font-semibold mb-8 break-words leading-snug p-4">
      <GradientText className="text-4xl md:text-6xl font-light">
        <div className="p-4">Why we build this</div>
      </GradientText>
    </div>
  );
};
export default GradientView;
export { GradientText };
