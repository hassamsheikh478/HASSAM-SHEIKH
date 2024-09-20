
 // Import Firebase libraries
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
 import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCrX3lgd2bMgtcK4H-XPYBVJy_uj4eFAE0",
    authDomain: "hackathon-1-f42cc.firebaseapp.com",
    projectId: "hackathon-1-f42cc",
    storageBucket: "hackathon-1-f42cc.appspot.com",
    messagingSenderId: "954356317772",
    appId: "1:954356317772:web:36dc2007d5dc06b4f5fee9",
    measurementId: "G-3SN98VCJEN"
  };

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
