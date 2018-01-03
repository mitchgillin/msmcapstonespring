import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyBs_wb2cGb3raHkpaMt0B0juR0VDkbQFVM",
  authDomain: "msmemr-e15f2.firebaseapp.com",
  databaseURL: "https://msmemr-e15f2.firebaseio.com",
  projectId: "msmemr-e15f2",
  storageBucket: "msmemr-e15f2.appspot.com",
  messagingSenderId: "774847830157"
};
firebase.initializeApp(config);
export default firebase;