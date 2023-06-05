// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDS88LVmlbIIPsnUedmtV6uZTXG_holGQ0",

  authDomain: "vinyl-vault-e2732.firebaseapp.com",

  databaseURL: "https://vinyl-vault-e2732-default-rtdb.firebaseio.com",

  projectId: "vinyl-vault-e2732",

  storageBucket: "vinyl-vault-e2732.appspot.com",

  messagingSenderId: "988827046752",

  appId: "1:988827046752:web:5ec10f291f53b13284c405"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export default app;