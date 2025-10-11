// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "loginpakistanmart.firebaseapp.com",
  projectId: "loginpakistanmart",
  storageBucket: "loginpakistanmart.firebasestorage.app",
  messagingSenderId: "1055093206774",
  appId: "1:1055093206774:web:52df7c5d978ac06a7c46d7"
};

// Initialize Firebase
const App = initializeApp(firebaseConfig);
const Auth = getAuth(App)
const Provider = new GoogleAuthProvider()

export {Auth,Provider} 