// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// ✅ Do NOT import getAnalytics directly unless you wrap it in a check
import { isSupported, getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWaElmutgtcB5774sOgILMkD2sKB5aGPk",
  authDomain: "my-react-login-5587d.firebaseapp.com",
  projectId: "my-react-login-5587d",
  storageBucket: "my-react-login-5587d.firebasestorage.app",
  messagingSenderId: "690992030107",
  appId: "1:690992030107:web:ccb582edd7ecd20ccb813e",
  measurementId: "G-SXWFKC9Z1H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    }
  })};