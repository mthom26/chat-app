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

import { db } from '../firebase/index';

class App extends Component {
  constructor(props) {
    super(props);

    // Currently the handleUserPresence state is only reset to true when the page is refreshed, signing out then signing in on the same tab doesn't work
    this.state = {
      handleUserPresence: true
    };
  }

  componentDidUpdate() {
    const { authUser } = this.props;
    const { handleUserPresence } = this.state;

    if(authUser && handleUserPresence) {
      console.log('call do set presence');
      db.doSetPresence(authUser.uid, 'App');
      this.setState({handleUserPresence: false});
    } else {
      console.log('do not call set presence');
    }
  }

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
