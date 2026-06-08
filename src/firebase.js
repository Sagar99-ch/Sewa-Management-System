import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIw6JAqsWiCIPi_SgBF97OM2KqAHb9UTI",
  authDomain: "sewa-management-system.firebaseapp.com",
  projectId: "sewa-management-system",
  storageBucket: "sewa-management-system.firebasestorage.app",
  messagingSenderId: "431187186851",
  appId: "1:431187186851:web:4ba08416c4e1c8316c9b16",
  measurementId: "G-10J5SJS3C6",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
