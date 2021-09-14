import firebase from 'firebase/app';
import admin, { ServiceAccount } from 'firebase-admin';
import 'firebase/firestore';
import 'firebase/auth'
import configEnv from '../config';
import serviceAccount from '../serviceAccount.json'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: configEnv.FIREBASE_API_KEY,
  authDomain: configEnv.FIREBASE_AUTH_DOMAIN,
  projectId: configEnv.FIREBASE_PROJECT_ID,
  storageBucket: configEnv.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: configEnv.FIREBASE_MESSAGING_SENDER_ID,
  appId: configEnv.FIREBASE_APP_ID,
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount)
})

export const googleProvider = new firebase.auth.GoogleAuthProvider;

export { firebase as default, admin,  };
