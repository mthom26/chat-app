import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavMenu from './NavMenu';
import ChatWindow from './ChatWindow';
import OnlineUsers from './OnlineUsers';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Profile from './Profile';
import Landing from './Landing';
import withAuthentication from '../hocs/withAuthentication';

class App extends Component {
  render() {
    return (
      <Router>
        <div className={css(styles.app)}>
          <NavMenu />
          <Route
            exact path="/"
            component={() => <Landing />}
          />
          <Route
            exact path="/signin"
            component={() => <SignIn />}
          />
          <Route
            exact path="/signup"
            component={() => <SignUp />}
          />
          <Route
            exact path="/home"
            component={() => (
              <div className={css(styles.main)}>
                <ChatWindow />
                <OnlineUsers />
              </div>)}
          />
          <Route
            exact path="/profile"
            component={() => <Profile />}
          />
        </div>
      </Router>
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
    display: 'flex'
  }
});

export default withAuthentication(App);
