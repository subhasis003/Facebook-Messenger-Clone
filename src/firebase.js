
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBH5mGXQH-BUnsxVuixZ-hmA0fVjzvB4ow",
    authDomain: "messenger-clone-45103.firebaseapp.com",
    projectId: "messenger-clone-45103",
    storageBucket: "messenger-clone-45103.appspot.com",
    messagingSenderId: "371892095489",
    appId: "1:371892095489:web:a7191652c6953eb9ec0e00",
    measurementId: "G-3BV93KGEGJ",
});

const db = firebaseApp.firestore();
export default db;


