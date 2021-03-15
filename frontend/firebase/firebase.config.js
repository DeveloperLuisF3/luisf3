import { ContactSupportOutlined, LeakRemove } from "@material-ui/icons";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
};

let db = firebase.firestore();
let usersRef = db.collection('users');

export let loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var user = result.user;
      console.log(user);
      localStorage.setItem('user', JSON.stringify(result.user));
      createUser(user);
      return result.user;
    }).catch((error) => {
      console.log(error);
    });
};

let createUser = (user) => {
  let name = user.displayName;
  let email = user.email;
  let image = user.photoURL;
  let userId = user.uid;
  let userObject = { name, email, image, userId };
  console.log(userObject);
  usersRef.doc(userObject.userId).set({ userObject })
    .then(() => {
      console.log("User Created");
    })
    .catch((error) => {
      console.log("error");
    });
};

export let logOut = () => {
  firebase.auth().signOut();
  localStorage.removeItem('user');
};

export let deleteUser = () => {
  let delUser = firebase.auth().currentUser;
  console.log(delUser.uid);
  usersRef.doc(delUser.uid).delete()
    .then(() => {
      console.log("User Data Delete");
      leave(delUser);
    }).catch((error) => {
      console.log("Error removing document: ", error);
    });
};

let leave = (delUser) => {
  delUser.delete().then(() => {
    console.log("User Deleted");
  }).catch((error) => {
    console.log(error);
  });
};

export default firebase;
