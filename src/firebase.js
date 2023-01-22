import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtjHvLy-MgD7F92vMA_ivbP8sF2fBotOU",
  authDomain: "adda-6df21.firebaseapp.com",
  projectId: "adda-6df21",
  storageBucket: "adda-6df21.appspot.com",
  messagingSenderId: "726008180368",
  appId: "1:726008180368:web:676e0a5587d0b1faacb215",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
