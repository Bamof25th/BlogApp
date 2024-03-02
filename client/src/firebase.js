// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // eslint-disable-next-line no-undef
  apiKey:  import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-10c22.firebaseapp.com",
  projectId: "mern-blog-10c22",
  storageBucket: "mern-blog-10c22.appspot.com",
  messagingSenderId: "230114619994",
  appId: "1:230114619994:web:82cb610803731973621e63",
  measurementId: "G-B239HX8HYN",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
