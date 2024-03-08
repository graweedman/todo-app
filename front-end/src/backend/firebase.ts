// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAo8SW8W13ay1dnI_Na029DiXBFgBl6ga4",
  authDomain: "simple-todoapp-103a1.firebaseapp.com",
  databaseURL: "https://simple-todoapp-103a1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "simple-todoapp-103a1",
  storageBucket: "simple-todoapp-103a1.appspot.com",
  messagingSenderId: "890082266640",
  appId: "1:890082266640:web:878b1577cfc48cb911c495",
  measurementId: "G-HN7EMQ52KD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const functions = getFunctions(app);

