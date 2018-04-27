import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../contexts/index';
import SignOut from './SignOut';
import * as colors from '../constants/colors';

const NavMenu = () => {
  return (
    <AuthUserContext>
      {authUser => {
        return (
          <div className={css(styles.navMenu)}>
            <div className={css(styles.navLogo)}>
              LOGO
            </div>
            <div>
              <div className={css(styles.navLinks)}>
                {authUser &&
                  <Link
                    className={css(styles.navButton)}
                    to="/home">
                    HOME
                  </Link>}
                {authUser &&
                  <Link
                    className={css(styles.navButton)}
                    to="/profile">
                    PROFILE
                  </Link>}
                {authUser &&
                  <SignOut
                    passedClasses={css(styles.navButton)}>
                    SIGN OUT
                  </SignOut>}
                {!authUser &&
                  <Link
                    className={css(styles.navButton)}
                    to="/signin">
                    SIGN IN
                  </Link>}
                {!authUser &&
                  <Link
                    className={css(styles.navButton)}
                    to="/signup">
                    SIGN UP
                  </Link>}
              </div>
            </div>
          </div>
        );
      }}
    </AuthUserContext>
  );
};

const styles = StyleSheet.create({
  navMenu: {
    display: 'flex',
    borderBottom: `2px solid ${colors.yellow}`,
    background: 'linear-gradient(350deg, rgba(0,0,0,0.3), rgba(255,255,255,0.15))',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: '0 35px'
  },
  navLinks: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  navButton: {
    cursor: 'pointer',
    fontWeight: 'bold',
    letterSpacing: '2px',
    padding: '15px 25px',
    ':hover': {
      background: colors.lightGrey
    }
  },
  navLogo: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontWeight: 'bold',
    letterSpacing: '2px',
    padding: '0 25px'
  }
});

export default NavMenu;
