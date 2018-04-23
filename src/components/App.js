import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import NavMenu from './NavMenu';
import ChatWindow from './ChatWindow';
import OnlineUsers from './OnlineUsers';
import SignUp from './SignUp';
import SignIn from './SignIn';

class App extends Component {
  render() {
    return (
      <div className={css(styles.app)}>
        <NavMenu />
        <SignIn />
        {/* <div className={css(styles.main)}>
          <ChatWindow />
          <OnlineUsers />
        </div> */}
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
