import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBNlFiXuIs9nhjel1rqKvveDPyAjrvAKpQ",
  authDomain: "integrador-f3468.firebaseapp.com",
  projectId: "integrador-f3468",
  storageBucket: "integrador-f3468.appspot.com",
  messagingSenderId: "420442702727",
  appId: "1:420442702727:web:890ce5aa7a74ca86144922",
  measurementId: "G-F0N07MEE9Q"
};

// Initialize Firebase
const db = initializeApp(firebaseConfig);

export default db