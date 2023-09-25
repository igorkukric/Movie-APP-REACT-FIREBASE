// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "test-project-cf680.firebaseapp.com",

  projectId: "test-project-cf680",

  storageBucket: "test-project-cf680.appspot.com",

  messagingSenderId: "93147389326",

  appId: "1:93147389326:web:a52a81b6b51e2ffa28d8df",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
