import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const OnlineUsers = () => {
  return (
    <div className={css(styles.onlineUsers)}>
      Online Users
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
