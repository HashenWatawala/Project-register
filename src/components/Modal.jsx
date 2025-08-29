// components/Modal.js
"use client";
import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // don't render if closed

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-lg mx-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
