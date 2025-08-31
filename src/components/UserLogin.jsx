"use client";

import React, { useState } from "react";
import { 
  doSignWithUserWithEmailAndPassword, 
  doSignInWithGoogle, 
  doCreateUserWithEmailAndPassword 
} from "../firebase/auth";
import { useAuth } from "../context/authContext/index";

const Login2 = () => {
  const { userLoggedIn } = useAuth();
  const [mode, setMode] = useState("login"); // 👈 "login" or "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // ✅ Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await doSignWithUserWithEmailAndPassword(email, password);
      console.log("✅ Login successful");
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Signup handler
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      console.log("✅ Signup successful");
      setMode("login"); // 👈 redirect back to login popup
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Google login
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
      <h1 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
        {mode === "login" ? "Sign in with email" : "Create an account"}
      </h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={mode === "login" ? handleLogin : handleSignup} className="space-y-6">
        {/* Email */}
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
          >
            {passwordVisible ? "🙈" : "👁️"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-900 shadow-md transition-transform transform hover:scale-105"
        >
          {mode === "login" ? "Login" : "Sign Up"}
        </button>
      </form>

      {/* Switch between login / signup */}
      <div className="text-center mt-4">
        {mode === "login" ? (
          <p>
            Don’t have an account?{" "}
            <button
              onClick={() => setMode("signup")}
              className="text-sky-600 font-semibold hover:underline"
            >
              Sign up
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button
              onClick={() => setMode("login")}
              className="text-sky-600 font-semibold hover:underline"
            >
              Log in
            </button>
          </p>
        )}
      </div>

      {/* Google option (only for login mode) */}
      {mode === "login" && (
        <>
          <div className="flex items-center my-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-sm text-gray-500">Or sign in with</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleGoogleLogin}
              className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-100"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="h-5 w-5"
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Login2;
