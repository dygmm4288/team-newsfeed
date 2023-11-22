// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmyVHtwvpHiMB_TgpaZEkq9MMp7jdpiPQ",
  authDomain: "newsfeed-55fad.firebaseapp.com",
  projectId: "newsfeed-55fad",
  storageBucket: "newsfeed-55fad.appspot.com",
  messagingSenderId: "45940328293",
  appId: "1:45940328293:web:5cc9926696a944c6f2438c",
  measurementId: "G-C7CKRDT48Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);