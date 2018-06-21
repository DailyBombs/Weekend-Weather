import { initializeFirebase } from '../config/config';

this.app = initializeFirebase;

export const removeNote = (userID, noteID) => {
  console.log(userID, noteID);
  this.database = this.app.database().ref(`/weatherRequirements/${userID}/`);
  this.app.database().ref(`/weatherRequirements/${userID}/`).child(noteID).remove();
};
