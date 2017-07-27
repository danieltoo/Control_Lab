 import * as firebase from 'firebase';
 
 var config = {
    apiKey: "AIzaSyAZhB07O7RHk_NWJ6cDykT6QYB3WjpUL_c",
    authDomain: "control-lab.firebaseapp.com",
    databaseURL: "https://control-lab.firebaseio.com",
    projectId: "control-lab",
    storageBucket: "control-lab.appspot.com",
    messagingSenderId: "696184998741"
  };
firebase.initializeApp(config);

export default firebase;