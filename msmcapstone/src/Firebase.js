import * as firebase from "firebase";
var config = {
  apiKey: "AIzaSyBs_wb2cGb3raHkpaMt0B0juR0VDkbQFVM",
  authDomain: "msmemr-e15f2.firebaseapp.com",
  databaseURL: "https://msmemr-e15f2.firebaseio.com",
  projectId: "msmemr-e15f2",
  storageBucket: "msmemr-e15f2.appspot.com",
  messagingSenderId: "774847830157"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
