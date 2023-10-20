import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCHAv0CIrCH5VICDFddb-1bc7tnHzhBWZs",
  authDomain: "chat-with-dive.firebaseapp.com",
  databaseURL: "https://chat-with-dive-default-rtdb.firebaseio.com",
  projectId: "chat-with-dive",
  storageBucket: "chat-with-dive.appspot.com",
  messagingSenderId: "519973358951",
  appId: "1:519973358951:web:5e6ed95d23fbdedc7c33c2",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

export { firebaseApp, firebaseConfig, db, auth };
