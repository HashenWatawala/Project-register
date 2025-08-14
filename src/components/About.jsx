import React from "react";
import Gradient from "./Gradiant";
import aboutImage from "../assets/about-image.png";
import GradientView from "./Gradiant-text";
import { GradientText } from "./Gradiant-text";
import GlowLine from "./Glow-line";
import { TypingText } from "./Typing";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white px-6 py-12">
      <div className="relative w-full h-1 mb-12">
        <GlowLine orientation="horizontal" position={0} color="blue" />
      </div>

      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-12">
  <h1 className="text-2xl  md:text-6xl lg:text-4xl">
    <TypingText
      text={["About", "Our Story", "Who We Are"]}
      cursor={true}
      loop={true}
      duration={100}
      holdDelay={1500}
    />
  </h1>
</div>

      

      {/* Image and Description */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-transparent">
        <div className="relative">
          <img
            src={aboutImage}
            alt="Team collaboration"
            className="w-full"
            style={{ background: 'transparent' }}
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-8">
            <GradientView />
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-justify">
            Finding the right platform to register project ideas, get feedback,
            or even find collaborators is often difficult. Our solution helps
            users formalize their ideas, store them securely, and gain
            visibility among peers and mentors.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-justify">
            Whether you're a student looking to register your capstone idea or a
            professional seeking team input — our tool makes idea management
            easy, structured, and impactful.
          </p>
        </div>
      </div>

      {/* Mission or Team Section */}
      <div className="max-w-5xl mx-auto mt-20 text-center">
        <h2 className="text-4xl md:text-6xl font-semibold mb-4">
          <GradientText>
            <div className="p-4">Our Mission</div>
          </GradientText>
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Empower innovation by providing a seamless space for ideation,
          registration, and collaboration.
        </p>
      </div>
    </div>
  );
};

export default About;
