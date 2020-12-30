
  import firebase from 'firebase'
require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyBk5YvcF2QiaZnv6VKUbPjHNWVSNqhm3KY",
    authDomain: "batter-system.firebaseapp.com",
    databaseURL: "https://batter-system.firebaseio.com",
    projectId: "batter-system",
    storageBucket: "batter-system.appspot.com",
    messagingSenderId: "503545026769",
    appId: "1:503545026769:web:3540ea88a4a80d93fe0df0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore()