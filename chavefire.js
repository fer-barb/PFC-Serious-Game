import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBGNUffctYC_yLX822fluZ6-nENVOmF8vg",
  authDomain: "pfc-serious-game.firebaseapp.com",
  projectId: "pfc-serious-game",
  storageBucket: "pfc-serious-game.firebasestorage.app",
  messagingSenderId: "922447546223",
  appId: "1:922447546223:web:bfbae13bf622c000270a9a",
  measurementId: "G-5PVNQM6X53"

};


const app = initializeApp(firebaseConfig);

export const bancodedados = getFirestore(app);

