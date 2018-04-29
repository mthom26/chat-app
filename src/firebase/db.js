import { db } from './firebase';
import * as firebase from 'firebase';

//const userListRef = db.ref('onlineUsers');
//const myUserRef = userListRef.push();


export const doCreateUser = (id, name, email) => {
  return (
    db.ref(`users/${id}`).set({
      username: name,
      email: email
    })
  );
};

export const doCreateMessage = (room, name, message) => {

  const ref = db.ref(`rooms/${room}`);
  const messageRef = ref.push();
  return (
    messageRef.set({
      username: name,
      message: message
    })
  );
};

export const doSetPresence = (id, name) => {

  var myConnectionsRef = db.ref(`usersOnline`).push(id);

  var connectedRef = db.ref('.info/connected');
  return (
    connectedRef.on('value', function(snap) {
      if (snap.val() === true) {
        myConnectionsRef.onDisconnect().remove();
        myConnectionsRef.set({
          name: name,
          id: id
        });
      }
    })
  );
};
