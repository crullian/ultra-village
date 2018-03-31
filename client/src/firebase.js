import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyA_THJITnFbYq-6d-Nx3TLPhs8y2MMkYJ4",
  authDomain: "api-project-464300049727.firebaseapp.com",
  databaseURL: "https://api-project-464300049727.firebaseio.com",
  projectId: "api-project-464300049727",
  storageBucket: "",
  messagingSenderId: "464300049727"
};

firebase.initializeApp(config);

export default firebase;
