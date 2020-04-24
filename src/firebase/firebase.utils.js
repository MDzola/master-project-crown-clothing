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

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();

    // WE ARE CREATING A VARIABLE THAT CONTAINS OUR FIREBASE USER DB COLLECTION
    // const collectionRef = firestore.collection('users');

    // WE ARE NOW CALLING THE SNAPSHOT OF THE DATA AND THEN MAPPING OVER IT TO SHOW US WHAT THE ARE OBJECTS CONTAIN
    // const collectionSnapshot = await collectionRef.get()
    // console.log({ collection: collectionSnapshot.docs.map(doc => doc.data()) })

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

        try {
          await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
          })
        } catch(error) {
            console.log('error creating user', error.message);
        }
     }

     return userRef;
  }

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
      console.log(newDocRef);
    });

   return await batch.commit();

  };

  export const convertCollectionSnapshotToMap = collectionSnapshot => {
    const transformedCollection = collectionSnapshot.docs.map(docSnapshot => {
      const { title, items } = docSnapshot.data();

      return {
        routeName: encodeURI(title.toLowerCase()),
        id: docSnapshot.id,
        title,
        items
      };
    });

   return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, {});
  };


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;