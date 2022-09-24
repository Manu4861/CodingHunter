// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAK7NIfaTBgFmrs6MvdhTzeweX7j3WswoU",
    authDomain: "codinghunter-6310e.firebaseapp.com",
    projectId: "codinghunter-6310e",
    storageBucket: "codinghunter-6310e.appspot.com",
    messagingSenderId: "731728980037",
    appId: "1:731728980037:web:9bc5b89aae7f647bbe9b2c",
    measurementId: "G-PD92YGMR0D"
};

// Initialize Firebase

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore();
export const auth = getAuth(app)