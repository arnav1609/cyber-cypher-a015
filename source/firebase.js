// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCD4UG0kx1I2Yx2Hom-7iFP_JBnVnbZphY",
  authDomain: "cyber-cypher-a015.firebaseapp.com",
  projectId: "cyber-cypher-a015",
  storageBucket: "cyber-cypher-a015.firebasestorage.app",
  messagingSenderId: "654934862224",
  appId: "1:654934862224:web:a275e523c84277ec10eb15",
  measurementId: "G-DJPZF8FY7Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);