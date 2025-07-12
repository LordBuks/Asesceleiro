// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQC1b9T7m9P0rDnuQJ2Mi8WEN4PyYcXzw",
  authDomain: "painel-67581.firebaseapp.com",
  projectId: "painel-67581",
  storageBucket: "painel-67581.firebasestorage.app",
  messagingSenderId: "988754263934",
  appId: "1:988754263934:web:4633e23c219aa01832bd2f",
  measurementId: "G-SJ4N37CE1C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

