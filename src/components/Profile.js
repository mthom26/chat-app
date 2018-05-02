import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';
import withAuthorization from '../hocs/withAuthorization';
import { AuthUserContext } from '../contexts/index';
import * as routes from '../constants/routes';
import * as colors from '../constants/colors';

const ProfilePage = (props) => {
  return (
    <AuthUserContext.Consumer>
      {authUser => {
        return (
          <div className={css(styles.outerContainer)}>
            <div className={css(styles.container)}>
              <div className={css(styles.profile)}>
                <div className={css(styles.profileImage)}>
                  Profile Image
                </div>
                <div>
                  <h3>{authUser.displayName}</h3>
                  <h3>{authUser.email}</h3>
                  <Link className={css(styles.link)} to={routes.PASSWORD_CHANGE}>Change password</Link>
                </div>
              </div>
              <div>
                Messages Section
              </div>

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
  profile: {
    display: 'flex',
    justifyContent: 'center'
  },
  profileImage: {
    border: '1px solid cyan',
    margin: '1rem'
  },
  link: {
    color: colors.yellow
  },
  outerContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  container: {
    maxWidth: '1080px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '1px solid red'
  }
});

export default withAuthorization(authCondition)(ProfilePage);
