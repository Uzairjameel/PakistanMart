import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const App = apiKey
  ? initializeApp({
      apiKey,
      authDomain: "loginpakistanmart.firebaseapp.com",
      projectId: "loginpakistanmart",
      storageBucket: "loginpakistanmart.firebasestorage.app",
      messagingSenderId: "1055093206774",
      appId: "1:1055093206774:web:52df7c5d978ac06a7c46d7",
    })
  : null;
const Auth = App ? getAuth(App) : null;
const Provider = new GoogleAuthProvider();
export { Auth, Provider };
