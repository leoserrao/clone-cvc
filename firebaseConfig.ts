import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Substitua pelos dados do seu projeto Firebase Console
// https://console.firebase.google.com/
const firebaseConfig = {
  apiKey: "API_KEY_AQUI",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);