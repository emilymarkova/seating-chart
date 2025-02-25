// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6VTvnUyoT4CVLV-oBOMnW7tXB53NSpMY",
  authDomain: "seating-chart-1a1a1.firebaseapp.com",
  projectId: "seating-chart-1a1a1",
  storageBucket: "seating-chart-1a1a1.firebasestorage.app",
  messagingSenderId: "471468712833",
  appId: "1:471468712833:web:ba245385fef54295bcbe80",
  measurementId: "G-LNV1L4V2KT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);