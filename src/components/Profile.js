import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import withAuthorization from '../hocs/withAuthorization';
import { AuthUserContext } from '../contexts/index';

const ProfilePage = (props) => {
  return (
    <AuthUserContext.Consumer>
      {authUser => {
        return (
          <div className={css(styles.outerContainer)}>
            <div className={css(styles.container)}>
              <h2>Profile page for: {authUser.email}</h2>
            </div>
          </div>
        );
      }}
    </AuthUserContext.Consumer>
  );
};

const authCondition = (authUser) => {
  if(authUser) {
    return true;
  } else {
    return false;
  }
};

const styles = StyleSheet.create({
  outerContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  container: {
    maxWidth: '1080px',
    display: 'flex',
    justifyContent: 'center'
  }
});

export default withAuthorization(authCondition)(ProfilePage);
