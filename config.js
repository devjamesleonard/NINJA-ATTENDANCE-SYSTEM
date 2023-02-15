import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyB-TVnuj8tY_LfNWUE7qWIa7bx3zC7X-rk",

  authDomain: "youngjustice-15e55.firebaseapp.com",

  projectId: "youngjustice-15e55",

  storageBucket: "youngjustice-15e55.appspot.com",

  messagingSenderId: "514588037825",

  appId: "1:514588037825:web:6ba4f1f01308738315fa40",

  measurementId: "G-FW24XS3KVG"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);