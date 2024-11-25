// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyA-pXNJYB3jYMty2lcxwy5O-bxaQ05O7_A",
  authDomain: "diary-app-2172d.firebaseapp.com",
  projectId: "diary-app-2172d",
  storageBucket: "diary-app-2172d.firebasestorage.app",
  messagingSenderId: "271379441103",
  appId: "1:271379441103:web:ed9c5f2770cd1ea905deba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
