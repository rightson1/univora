import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "univora2.firebaseapp.com",
  projectId: "univora2",
  storageBucket: "univora2.appspot.com",
  messagingSenderId: "9239604378",
  appId: "1:9239604378:web:96eaaa12065b8c7f1b8323",
};
const firebaseConfig2 = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY2,
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

const app2 = initializeApp(firebaseConfig2, "app2");
export const db2 = getFirestore(app2);
export const storage2 = getStorage(app2);
export const auth2 = getAuth(app2);
