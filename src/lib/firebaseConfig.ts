// src/lib/firebaseConfig.ts

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAKUTSJF1a48blZ7gGXku_Sbt2fYp38Hdw",
  authDomain: "estesi-86075.firebaseapp.com",
  projectId: "estesi-86075",
  storageBucket: "estesi-86075.appspot.com",
  messagingSenderId: "234470304310",
  appId: "1:234470304310:web:8073e17a3bea5b85594697",
  measurementId: "G-RN1TGPX4TK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };
