// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMToLKoUoz0vA5UzxSiuRVopB7S6ibcZ0",
  authDomain: "house-marketplace-app-3e889.firebaseapp.com",
  projectId: "house-marketplace-app-3e889",
  storageBucket: "house-marketplace-app-3e889.appspot.com",
  messagingSenderId: "344524454878",
  appId: "1:344524454878:web:5abb0bb19de163a3aebb4f",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
