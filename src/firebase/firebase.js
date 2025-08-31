// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4xUZUn99gC8mzJM3q4tZzdf5nMR3npKQ",
  authDomain: "pdfuploader-d706a.firebaseapp.com",
  projectId: "pdfuploader-d706a",
  storageBucket: "pdfuploader-d706a.firebasestorage.app",
  messagingSenderId: "271792110678",
  appId: "1:271792110678:web:010815681820e2699a8ff7",
  measurementId: "G-7Q0N82K9NF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {app, auth};
