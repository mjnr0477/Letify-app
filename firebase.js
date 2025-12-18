import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDAXKeo4zb53v-LNmoZGJOagUcGtNlO3Cw",
  authDomain: "pulse-f5547.firebaseapp.com",
  projectId: "pulse-f5547",
  storageBucket: "pulse-f5547.firebasestorage.app",
  messagingSenderId: "748217789233",
  appId: "1:748217789233:web:81f92a2ba83cd235129e10"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
