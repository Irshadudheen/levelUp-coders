import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsDngfvNqng4PSYGxeVuRvkrLLFHf5-ig",
  authDomain: "levelup-7e424.firebaseapp.com",
  projectId: "levelup-7e424",
  storageBucket: "levelup-7e424.appspot.com",
  messagingSenderId: "316148985305",
  appId: "1:316148985305:web:6120499fb6108fb3203dc8",
  measurementId: "G-JHJR23ZJ7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);