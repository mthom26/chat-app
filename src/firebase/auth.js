import { auth, db } from './firebase';

// Register
export const doCreateUser = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

// Sign In
export const doSignIn = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

// Sign Out
export const doSignOut = () => {
  auth.signOut();
  db.goOffline(); // Also disconnect from database so the user registers as offline on the server when signing out.
};

// Password Reset
export const doPasswordReset = (email) => {
  return auth.sendPasswordResetEmail(email);
};

// Password Change
export const doPasswordUpdate = (password) => {
  return auth.currentUser.updatePassword(password);
};
