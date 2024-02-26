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
  authDomain: "univora3.firebaseapp.com",
  projectId: "univora3",
  storageBucket: "univora3.appspot.com",
  messagingSenderId: "705980048329",
  appId: "1:705980048329:web:457971598bbba324d8be18",
};

const app = initializeApp(firebaseConfig, {});
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

const app2 = initializeApp(firebaseConfig2, "app2");
export const db2 = getFirestore(app2);
export const storage2 = getStorage(app2);
export const auth2 = getAuth(app2);
