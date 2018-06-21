import Rebase from 're-base';
import Firebase from 'firebase/app';
import 'firebase/auth';

const dbConfig = {
  apiKey: 'AIzaSyCNS6L3u3wyUMk7I2p1svik7UjnxARFT44',
  authDomain: 'weekendweather-ad640.firebaseapp.com',
  databaseURL: 'https://weekendweather-ad640.firebaseio.com',
  projectId: 'weekendweather-ad640',
  storageBucket: 'weekendweather-ad640.appspot.com',
  messagingSenderId: '1033867644614',
};

const initializeFirebase = Firebase.initializeApp(dbConfig);
const base = Rebase.createClass(initializeFirebase.database());
const facebookProvider = new Firebase.auth.FacebookAuthProvider();

const weatherRequirementScope = userID => initializeFirebase.database().ref(`/weatherRequirements/${userID}/`);
const userScope = userID => initializeFirebase.database().ref(`/users/${userID}/`);

export {
  weatherRequirementScope,
  userScope,
  initializeFirebase,
  base,
  facebookProvider,
};
