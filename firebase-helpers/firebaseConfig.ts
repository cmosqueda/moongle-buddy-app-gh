// contains firebase config

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// secret config
import { firebaseSecret } from "@/secret";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //   apiKey: "AIzaSyC6F8rtiHyDBokySWEptRhgc5R75jWxRnQ",
  //   authDomain: "moongle-buddy-app.firebaseapp.com",
  //   projectId: "moongle-buddy-app",
  //   storageBucket: "moongle-buddy-app.firebasestorage.app",
  //   messagingSenderId: "383294989865",
  //   appId: "1:383294989865:web:99790db58856a2fc61de38",
  //   measurementId: "G-2FK95JK37V",

  // secret configs
  apiKey: firebaseSecret.API_KEY,
  authDomain: firebaseSecret.AUTH_DOMAIN,
  projectId: firebaseSecret.PROJECT_ID,
  storageBucket: firebaseSecret.STORAGE_BUCKET,
  messagingSenderId: firebaseSecret.MESSAGING_SENDER_ID,
  appId: firebaseSecret.APP_ID,
  measurementId: firebaseSecret.MEASUREMENT_ID,
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_DB = getFirestore(FIREBASE_APP);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// const analytics = getAnalytics(app);

if (FIREBASE_APP && FIREBASE_DB && FIREBASE_AUTH) {
  console.log("firebase app, firestore, and auth are initialized!");
}

export { FIREBASE_APP, FIREBASE_DB, FIREBASE_AUTH };
