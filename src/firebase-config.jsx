// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyCXVEkM8jKmJmm_j_TZST69vmbJjiaMF-U",
  // authDomain: "lankadashboard.firebaseapp.com",
  // projectId: "lankadashboard",
  // storageBucket: "lankadashboard.appspot.com",
  // messagingSenderId: "767949081866",
  // appId: "1:767949081866:web:383f0f928a918021b53ef3",
  // measurementId: "G-F0HGYZW6W5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);