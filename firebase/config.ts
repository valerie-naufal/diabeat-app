import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUvZtA0C3Z7NzqIbr-ZDkbwIxcVsCtaVE",
  authDomain: "diabeat-efeb3.firebaseapp.com",
  projectId: "diabeat-efeb3",
  storageBucket: "diabeat-efeb3.firebasestorage.app",
  messagingSenderId: "1047173296762",
  appId: "1:1047173296762:web:1ad6030e0df789e4c101c3",
  measurementId: "G-2MH905LW7E",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { auth };
