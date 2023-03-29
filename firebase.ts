import {getApp, getApps, initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCb6tqQOOetXlTekSrva6AG7Vsp8zch8j8",
  authDomain: "multiple-apps2.firebaseapp.com",
  projectId: "multiple-apps2",
  storageBucket: "multiple-apps2.appspot.com",
  messagingSenderId: "361804825534",
  appId: "1:361804825534:web:2b53dc99efededee8f2fef"
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