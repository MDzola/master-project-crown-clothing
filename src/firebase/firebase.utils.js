import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBOK5paIoQ1zvNRU1PEOf0EpBjBlrs52lU",
    authDomain: "crown-db-26e7a.firebaseapp.com",
    databaseURL: "https://crown-db-26e7a.firebaseio.com",
    projectId: "crown-db-26e7a",
    storageBucket: "crown-db-26e7a.appspot.com",
    messagingSenderId: "502666997440",
    appId: "1:502666997440:web:2a009f117db4d516680725",
    measurementId: "G-8KFLRCC0GZ"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;