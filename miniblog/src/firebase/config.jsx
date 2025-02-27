import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFX_WmzObPoR32lVj6F_wAIkBmJx5gTfc",
  authDomain: "miniblog-ce942.firebaseapp.com",
  projectId: "miniblog-ce942",
  storageBucket: "miniblog-ce942.firebasestorage.app",
  messagingSenderId: "143605437565",
  appId: "1:143605437565:web:d149550464e24ba64e0d14",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
