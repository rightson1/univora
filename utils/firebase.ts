import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "hue-14696.firebaseapp.com",
  projectId: "hue-14696",
  storageBucket: "hue-14696.appspot.com",
  messagingSenderId: "870168402867",
  appId: "1:870168402867:web:3d98511280c95f432809c6",
  measurementId: "G-X96QNV3R41",
};

const app = initializeApp(firebaseConfig, {});
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
