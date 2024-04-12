// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCVU6C1UUKzcvo9mSKupMO3KfgNUbrGuTk",
    authDomain: "project-253db.firebaseapp.com",
    projectId: "project-253db",
    storageBucket: "project-253db.appspot.com",
    messagingSenderId: "996751430762",
    appId: "1:996751430762:web:180fb73f06371dcdb3e613"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);