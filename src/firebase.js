import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Senin Firebase kimlik kartın (Değiştirmeden aldım)
const firebaseConfig = {
  apiKey: "AIzaSyBhqNazcl4OwZIV3QpYwVYZiarvfEWvcUQ",
  authDomain: "elif-sac.firebaseapp.com",
  projectId: "elif-sac",
  storageBucket: "elif-sac.firebasestorage.app",
  messagingSenderId: "929675768680",
  appId: "1:929675768680:web:48c0c8e3f2cd8a78a25cdd",
  measurementId: "G-JSYC7SB54E"
};

// Uygulamayı başlat
const app = initializeApp(firebaseConfig);

// Veritabanı ve Depolama servislerini aktif et ve dışarı aktar
export const db = getFirestore(app);
export const storage = getStorage(app);