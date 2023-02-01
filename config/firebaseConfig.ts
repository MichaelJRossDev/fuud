// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getDatabase, set, ref } from "firebase/database";
import { getAuth } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const firebaseConfig = {
  apiKey: "AIzaSyCKOUPUBB8pgVuHi1_p1oW-2emVi0AAsMg",

  authDomain: "fuud-34a91.firebaseapp.com",

  databaseURL:
    "https://fuud-34a91-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "fuud-34a91",

  storageBucket: "fuud-34a91.appspot.com",

  messagingSenderId: "918281661134",

  appId: "1:918281661134:web:cf7d855a0b6b87b41a3e9f",

  measurementId: "G-E5GVKX5L38",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);