import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import NavMenu from './NavMenu';
import ChatWindow from './ChatWindow';
import OnlineUsers from './OnlineUsers';

class App extends Component {
  render() {
    return (
      <div classname={css(styles.app)}>
        <NavMenu />
        <div className={css(styles.main)}>
          <ChatWindow />
          <OnlineUsers />
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  main: {
    display: 'flex',
    border: '2px solid red',
    justifyContent: 'space-between'
  }
});

export default App;
