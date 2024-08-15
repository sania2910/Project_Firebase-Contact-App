// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCexepHwaNfxIn3ivzydiftK0l4V0cDkJE",
  authDomain: "vite-contact-2278a.firebaseapp.com",
  projectId: "vite-contact-2278a",
  storageBucket: "vite-contact-2278a.appspot.com",
  messagingSenderId: "996177812496",
  appId: "1:996177812496:web:c1c44133fbf23cab75be95"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);