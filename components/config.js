import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getAuth, initializeAuth, getReactNativePersistence} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";

import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore'
// import { getAuth } from 'firebase/auth'
// import { getStorage } from "firebase/storage";

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
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app)
// export const auth = getAuth(app)
// export const storage = getStorage(app);

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

export const db = getFirestore(app);
export const storage = getStorage(app);