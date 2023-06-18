import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, updateProfile, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_CHAT_API_KEY,
  authDomain: process.env.REACT_APP_CHAT_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_CHAT_PROJECT_API,
  storageBucket: process.env.REACT_APP_CHAT_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_CHAT_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_CHAT_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize storage

// Exports
export { db, auth, updateProfile, GoogleAuthProvider, storage }; // Export storage
