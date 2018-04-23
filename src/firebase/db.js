import { db } from './firebase';

export const doCreateUser = (id, name, email) => {
  return (
    db.ref(`users/${id}`).set({
      username: name,
      email: email
    })
  );
};
