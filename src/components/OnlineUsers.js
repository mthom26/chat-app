import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const OnlineUsers = (props) => {
  const { users } = props;
  let usersArray = [];
  if(users) {
    usersArray = Object.keys(users).map(key => {
      return users[key];
    });
  }


  return (
    <div className={css(styles.onlineUsers)}>
      <h3>Online Users</h3>
      {usersArray.length && usersArray.map(user => {
        return (
          <div key={user.id}>{user.name}</div>
        )
      })}
    </div>
  );
};

const styles = StyleSheet.create({
  onlineUsers: {
    flexBasis: '25%',
    border: '1px solid SpringGreen',
    margin: '25px',
    padding: '10px'
  }
});

export default OnlineUsers;
