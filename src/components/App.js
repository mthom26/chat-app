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
import PasswordForget from './PasswordForget';
import withAuthentication from '../hocs/withAuthentication';
import * as routes from '../constants/routes';
import { AuthUserContext } from '../contexts/index';

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
      db.doSetPresence(authUser.uid, authUser.displayName);
      this.setState({handleUserPresence: false});
    } else {
      console.log('do not call set presence');
    }
  }

  render() {
    const { authUser } = this.props;

    return (
      <Router>
        <div className={css(styles.app)}>
          <NavMenu />
          <Route
            exact path={routes.LANDING}
            component={() => <Landing />}
          />
          <Route
            exact path={routes.SIGN_IN}
            component={() => <SignIn />}
          />
          <Route
            exact path={routes.SIGN_UP}
            component={() => <SignUp />}
          />
          <Route
            exact path={routes.HOME}
            component={() => (
              <div className={css(styles.main)}>
                <ChatWindow authUser={authUser}/>
                <OnlineUsers />
              </div>)}
          />
          <Route
            exact path={routes.PROFILE}
            component={() => <Profile />}
          />
          <Route
            exact path={routes.PASSWORD_FORGET}
            component={() => <PasswordForget />}
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
