'use client';

import React, { useState, useEffect } from 'react';

// Icons
const MenuIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);

const XIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const SunIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

// Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navLinks = [
    { href: '#', label: 'Home' },
    { href: '#', label: 'About' },
    { href: '#', label: 'Upload' },
    { href: '#', label: 'Contact' },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="w-full backdrop-blur-2xl bg-black/90 dark:bg-black/10 border-b border-black/30 dark:border-white/10 shadow-md transition-all">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a href="#" className="text-white text-lg font-bold">Acme Inc</a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-6">
              {navLinks.map(link => (
                <a key={link.label} href={link.href} className="text-white hover:text-gray-200 text-sm font-medium transition">
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right-side Controls */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="hidden sm:inline-flex px-4 py-2 rounded-md bg-white text-black text-sm font-semibold hover:bg-gray-100 transition"
              >
                Get Started
              </a>

              <button onClick={toggleTheme} className="p-2 rounded-md text-white hover:bg-white/10 transition">
                {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
              </button>

              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-md text-white hover:bg-white/10 transition">
                {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown (inside blurred area) */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 dark:border-white/10 px-4 py-6 flex flex-col gap-4 text-white text-lg">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="w-full text-center hover:text-gray-300 transition"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#"
              className="w-full text-center bg-white text-black font-semibold py-2 rounded-md hover:bg-gray-100 transition"
            >
              Get Started
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
