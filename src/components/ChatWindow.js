import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const ChatWindow = () => {
  return (
    <div className={css(styles.chatWindow)}>
      Chat Window
    </div>
  );
};

const styles = StyleSheet.create({
  chatWindow: {
    flexBasis: '75%',
    border: '1px solid yellow',
    margin: '25px',
    padding: '10px'
  }
});

export default ChatWindow;
