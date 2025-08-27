"use client";

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import GlowLine from "./Glow-line";
import { GradientText } from "./Gradiant-text";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white px-6 py-12">
      {/* Glow line at top */}
      <div className="relative w-full h-1 mb-12">
        <GlowLine orientation="horizontal" position={0} color="blue" />
      </div>

      {/* Page Title */}
      <div className="max-w-4xl mx-auto"></div>

      {/* Contact Section */}
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        
        {/* Left: Contact Info with animation */}
        <motion.div
          className="flex-1 p-6 rounded-lg flex flex-col justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: "easeOut" },
            },
          }}
        >
          <h2 className="text-4xl md:text-8xl font-light mb-6 text-left">
            <GradientText>
              <span className="block pb-8 pl-0">Contact Us</span>
            </GradientText>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Have questions or feedback about the Project Register?
            Reach us through the following:
          </p>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="text-blue-600" />
              <span>support@projectregister.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="text-blue-600" />
              <span>+94 77 123 4567</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="text-blue-600" />
              <span>Colombo, Sri Lanka</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Contact Form (no animation) */}
        <div className="flex-1 p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-800">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-600 
                  rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-600 
                  rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                rows="4"
                className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-600 
                  rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
