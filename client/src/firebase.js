import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "bookify-64eb4.firebaseapp.com",
  projectId: "bookify-64eb4",
  storageBucket: "bookify-64eb4.appspot.com",
  messagingSenderId: "1069531890970",
  appId: "1:1069531890970:web:580871c17d546d56a858a3"
};

export const app = initializeApp(firebaseConfig);