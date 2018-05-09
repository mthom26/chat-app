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
import PasswordUpdate from './PasswordUpdate';
import withAuthentication from '../hocs/withAuthentication';
import * as routes from '../constants/routes';
import { AuthUserContext } from '../contexts/index';

import { db } from '../firebase/index';

class App extends Component {
  constructor(props) {
    super(props);

    // Currently the handleUserPresence state is only reset to true when the page is refreshed, signing out then signing in on the same tab doesn't work
    this.state = {
      handleUserPresence: true,
      currentUser: null
    };

    this.updateUser = this.updateUser.bind(this);
  }

  updateUser(userid) {
    // Call db to get user info
    db.doGetUser(userid)
      .then(user => {
        this.setState({currentUser: user});
      });
  }

  componentDidUpdate() {
    const { authUser } = this.props;
    const { handleUserPresence } = this.state;

    if(authUser && handleUserPresence) {
      //console.log('call do set presence');
      db.doSetPresence(authUser.uid, authUser.displayName);
      this.updateUser(authUser.uid);
      this.setState({handleUserPresence: false});
    } else {
      //console.log('do not call set presence');
    }
  }

  render() {
    const { authUser } = this.props;
    const { currentUser } = this.state;

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
            component={() => <SignIn updateUser={this.updateUser}/>}
          />
          <Route
            exact path={routes.SIGN_UP}
            component={() => <SignUp updateUser={this.updateUser}/>}
          />
          <Route
            exact path={routes.HOME}
            component={() => (
              <div className={css(styles.main)}>
                <ChatWindow authUser={authUser} currentUser={currentUser}/>
                <OnlineUsers />
              </div>)}
          />
          <Route
            exact path={routes.PROFILE}
            component={() => <Profile currentUser ={currentUser}/>}
          />
          <Route
            exact path={routes.PASSWORD_FORGET}
            component={() => <PasswordForget />}
          />
          <Route
            exact path={routes.PASSWORD_CHANGE}
            component={() => <PasswordUpdate />}
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
