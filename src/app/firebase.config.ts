// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
  apiKey: "AIzaSyAbOuFtRVlpTpq9_OLNIyovqK7W9RLRHrc",
  authDomain: "limbicus-3cabf.firebaseapp.com",
  projectId: "limbicus-3cabf",
  storageBucket: "limbicus-3cabf.firebasestorage.app",
  messagingSenderId: "720323523931",
  appId: "1:720323523931:web:2808903818f962d618d67e",
  measurementId: "G-XWH2F49JT1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);

