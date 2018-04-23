import { auth } from './firebase';

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
  return auth.signOut();
};

// Password Reset
export const doPasswordReset = (email) => {
  return auth.sendPasswordResetEmail(email);
};

// Password Change
export const doPasswordUpdate = (password) => {
  return auth.currentUser.updatePassword(password);
};
