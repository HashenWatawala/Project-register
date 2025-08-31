'use client';

import React, { useState, useContext } from "react";
import { doSignWithUserWithEmailAndPassword, doSignInWithGoogle } from "../firebase/auth";
import { useAuth } from "../context/authContext/index";

const ArrowBoxIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 10L20 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 4H20V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 14L4 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 20H4V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
const EmailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>;
const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>;
const EyeOffIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>;
const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1877F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>;
const AppleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20.94c1.5 0 2.75-.81 3.5-2.06 1.25-1.25.75-3.44-.94-4.13-1.69-.69-2.81.5-3.56 1.31-.81.88-1.81 2.88-1.81 2.88s-1.06-2.06-2.56-2.06c-1.5 0-2.88 1.31-2.88 3.19 0 1.88 1.38 3.19 2.88 3.19.44 0 1.06-.19 1.5-.5.5.31 1.06.5 1.81.5zM12 2.5c-1.5 0-2.81.69-3.56 1.88-1.25 1.25-.75 3.44.94 4.13 1.69.69 2.81-.5 3.56-1.31.81-.88 1.81-2.88 1.81-2.88s1.06 2.06 2.56 2.06c1.5 0 2.88-1.31 2.88-3.19C20.75 4.5 19.38 3.19 17.88 3.19c-.44 0-1.06.19-1.5.5-.5-.31-1.06-.5-1.81-.5z"></path>
    </svg>;
const Login2 = () => {
    const { userLoggedIn } = useAuth(); // comes from context
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState("");
  
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };
  
    // handle email/password login
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await doSignWithUserWithEmailAndPassword(email, password);
        console.log("✅ Login successful");
        // optional: redirect to dashboard/home page
        // window.location.href = "/home";
      } catch (err) {
        setError(err.message);
      }
    };
  
    // handle Google sign in
    const handleGoogleLogin = async () => {
      try {
        await doSignInWithGoogle();
        console.log("✅ Google login successful");
      } catch (err) {
        setError(err.message);
      }
    };
  
    if (userLoggedIn) {
      return (
        <div className="text-center text-xl font-semibold text-green-600">
          ✅ You are already logged in!
        </div>
      );
    }
    return (
        <div className="font-sans text-gray-800 dark:text-gray-200 w-full max-w-md bg-white dark:bg-black shadow-2xl dark:shadow-gray-900/50 rounded-3xl p-8 mx-auto border border-gray-200 dark:border-gray-800">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <ArrowBoxIcon />
            </div>
          </div>
    
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
            Sign in with email
          </h1>
    
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
    
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* email */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                <EmailIcon />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                aria-label="Email"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition duration-300"
              />
            </div>
    
            {/* password */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                <LockIcon />
              </span>
              <input
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                aria-label="Password"
                required
                className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition duration-300"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                aria-label={passwordVisible ? "Hide password" : "Show password"}
              >
                {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
    
            <div className="text-right">
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-sky-600">
                Forgot password?
              </a>
            </div>
    
            <button
              type="submit"
              className="w-full bg-gray-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-900 shadow-md transition-transform transform hover:scale-105"
            >
              Get Started
            </button>
          </form>
    
          {/* OAuth options */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-sm text-gray-500">Or sign in with</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
    
          <div className="flex justify-center space-x-4">
            <button
              aria-label="Sign in with Google"
              onClick={handleGoogleLogin}
              className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-transform transform hover:scale-110"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5" />
            </button>
    
            <button
              aria-label="Sign in with Facebook"
              className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-transform transform hover:scale-110"
            >
              <FacebookIcon />
            </button>
    
            <button
              aria-label="Sign in with Apple"
              className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-transform transform hover:scale-110"
            >
              <AppleIcon />
            </button>
          </div>
        </div>
      );
    };
    
export default Login2;