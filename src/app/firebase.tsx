// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnn_JJgx1CL5ztdVSqSjxcwJ6fySR7Enc",
  authDomain: "interactive-comments-9bf2e.firebaseapp.com",
  projectId: "interactive-comments-9bf2e",
  storageBucket: "interactive-comments-9bf2e.appspot.com",
  messagingSenderId: "185303087640",
  appId: "1:185303087640:web:c151e868abba737a20a16d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
