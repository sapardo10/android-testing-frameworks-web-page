import firebase from 'firebase';

  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyCtPC17CCa8FuWftjaS8vl614y8xrSOWNQ",
    authDomain: "android-testing-f1edb.firebaseapp.com",
    databaseURL: "https://android-testing-f1edb.firebaseio.com",
    projectId: "android-testing-f1edb",
    storageBucket: "android-testing-f1edb.appspot.com",
    messagingSenderId: "1074281053964"
  };
  const fire = firebase.initializeApp(config);
  export default fire;
