import { db } from './firebase';
import * as firebase from 'firebase';

//const userListRef = db.ref('onlineUsers');
//const myUserRef = userListRef.push();


export const doCreateUser = (id, name, email) => {
  return (
    db.ref(`users/${id}`).set({
      username: name,
      email: email,
      profileurl: `https://robohash.org/${name}`
    })
  );
};

export const doGetUser = (userid) => {
  return (
    db.ref(`users/${userid}`).once('value')
      .then((snap) => {
        const user = snap.val();
        return user;
      })
  );
};

export const doCreateMessage = (room, name, message, profileimage) => {

  const ref = db.ref(`rooms/${room}`);
  const messageRef = ref.push();
  return (
    messageRef.set({
      id: messageRef.key,
      username: name,
      message: message,
      profileimage: profileimage,
      timestamp: firebase.database.ServerValue.TIMESTAMP
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
