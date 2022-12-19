import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDPHgaJsmH4BakR5mSuQptZjscC_9JmUms",
  authDomain: "chatbuzz-b7f0a.firebaseapp.com",
  projectId: "chatbuzz-b7f0a",
  storageBucket: "chatbuzz-b7f0a.appspot.com",
  messagingSenderId: "992119103623",
  appId: "1:992119103623:web:f931196c1dd341595ad822"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();