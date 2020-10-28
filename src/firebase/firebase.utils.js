import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA4sC490X5zmnFbqjH809L7klhcehlbkkQ",
  authDomain: "hipster-clothing-91f44.firebaseapp.com",
  databaseURL: "https://hipster-clothing-91f44.firebaseio.com",
  projectId: "hipster-clothing-91f44",
  storageBucket: "hipster-clothing-91f44.appspot.com",
  messagingSenderId: "571917405059",
  appId: "1:571917405059:web:5d12a6959db25e7df004b6",
  measurementId: "G-DL3W4G9ELP"
}

// Create a user profile in our firestore DB;
// userAuth is either google user object we get back from google login in App.js component did mount
// or a user object from auth.createUserWithEmailAndPassword in sign-up
export const createUserProfileDocument = async (userAuth, additionalData) => {
  // if null just return
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // const userRef = firestore.doc('users/123456789');
  console.log('the userRef Doc', userRef);

  const snapShot = await userRef.get();
  // console.log('DocSnapshot:', snapShot);
  // check the "exists" prop on our snapshot object (true or false)
  if (!snapShot.exists) {
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
  // return the userRef, it might be handy for other stuff
  return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
