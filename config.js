// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSID,
    appId: process.env.NEXT_PUBLIC_APPID,
    measurementId: process.env.NEXT_PUBLIC_MEASURMENTID
};

// Initialize Firebase

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore();
export const auth = getAuth(app)