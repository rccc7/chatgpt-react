import {getApp, getApps, initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBadbycvUi6K1fKNoeqtG3QS-psoc1E2qc",
  authDomain: "facebook-clone-f94bd.firebaseapp.com",
  databaseURL: "https://facebook-clone-f94bd.firebaseio.com",
  projectId: "facebook-clone-f94bd",
  storageBucket: "facebook-clone-f94bd.appspot.com",
  messagingSenderId: "171708782841",
  appId: "1:171708782841:web:475da1a95ae477f6386a28",
  measurementId: "G-TSC319LC5S"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// SINGLETON PATTERN:
// Initialize Firebase by first checking out whether there is already an app initiated.
// If there are apps then get the curent initialized app by calling getApp() otherwise
// initialize a new app
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};
// const analytics = getAnalytics(app);'