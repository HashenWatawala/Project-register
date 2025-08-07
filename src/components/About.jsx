import React from 'react';
import Gradient from './Gradiant';
import aboutImage from '../assets/about-image.png';
import GradientView from './Gradiant-text';
import { GradientText } from './Gradiant-text';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white px-6 py-12">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center mb-12">
      <Gradient className="max-w-xl mx-auto">
  <h1 className="text-3xl font-bold mb-4">About Project Idea Register</h1>
  <p>
    A platform for students and professionals to register, share, and collaborate on project ideas.
  </p>
</Gradient>
</div>

      {/* Image and Description */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    
          <img
            src={aboutImage}// replace with your PNG path
            alt="Team collaboration"
            className="w-full rounded-xl shadow-xl"
          />
        <div>
          <h2 className="text-2xl font-semibold mb-8"><GradientView/></h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-justify">
            Finding the right platform to register project ideas, get feedback, or even find collaborators is often difficult. Our solution helps users formalize their ideas, store them securely, and gain visibility among peers and mentors.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-justify">
            Whether you're a student looking to register your capstone idea or a professional seeking team input — our tool makes idea management easy, structured, and impactful.
          </p>
        </div>
      </div>

      {/* Mission or Team Section */}
      <div className="max-w-5xl mx-auto mt-20 text-center">
        <h2 className="text-4xl md:text-6xl font-semibold mb-4"><GradientText>
          <div className='p-4'>
            Our Mission
          </div>
          </GradientText></h2>
        <p className="text-gray-600 dark:text-gray-400">
          Empower innovation by providing a seamless space for ideation, registration, and collaboration.
        </p>
      </div>
    </div>
  );
};

export default About;
