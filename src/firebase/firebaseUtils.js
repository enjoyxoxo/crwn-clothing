import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
 apiKey: "AIzaSyCFq2U2MyRkTSEVppcUHbQ65LMoqXSB9J4",
 authDomain: "crwn-db-eea39.firebaseapp.com",
 projectId: "crwn-db-eea39",
 storageBucket: "crwn-db-eea39.appspot.com",
 messagingSenderId: "503892413571",
 appId: "1:503892413571:web:605dd0da3f7948dabe1fb6"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
   if (!userAuth) return;

   const userRef = firestore.doc(`users/${userAuth.uid}`);

   const snapShot = userRef.get();

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
       } catch (error) {
          console.log('error creating user', error.message);
       }
   }
   return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;