import React, { Component } from 'react';
import NavMenu from './NavMenu';
import ChatWindow from './ChatWindow';
import OnlineUsers from './OnlineUsers';

const appStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
};

const styles = {
  display: 'flex',
  border: '2px solid red',
  justifyContent: 'space-between'
};

class App extends Component {
  render() {
    return (
      <div style={appStyles}>
        <NavMenu />
        <div style={styles}>
          <ChatWindow />
          <OnlineUsers />
        </div>
      </div>
    );
  }
}

export default App;
