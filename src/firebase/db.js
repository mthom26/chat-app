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

export const doSetPresence = (id, message) => {
  // since I can connect from multiple devices or browser tabs, we store each connection instance separately
  // any time that connectionsRef's value is null (i.e. has no children) I am offline
  var myConnectionsRef = db.ref(`usersOnline/${id}`);

  // stores the timestamp of my last disconnect (the last time I was seen online)
  //var lastOnlineRef = db.ref(`usersOnline/${id}/lastOnlineRef`);

  var connectedRef = db.ref('.info/connected');
  return (
    connectedRef.on('value', function(snap) {
      if (snap.val() === true) {
        // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
        var con = myConnectionsRef.push();

        // When I disconnect, remove this device
        con.onDisconnect().remove();

        // Add this device to my connections list
        // this value could contain info about the device or a timestamp too
        con.set('online');

        // When I disconnect, update the last time I was seen online
        //lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
        console.log(`doSetPresence called from: ${message}`);
      }
    })
  );
};
