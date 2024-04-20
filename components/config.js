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
  apiKey: "AIzaSyBbDxf12i6o95ly8EOQHC-uDk_Dk-OaTCI",
  authDomain: "myapp1-40822.firebaseapp.com",
  projectId: "myapp1-40822",
  storageBucket: "myapp1-40822.appspot.com",
  messagingSenderId: "218653943082",
  appId: "1:218653943082:web:d197a74e34f7774c926a53"
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