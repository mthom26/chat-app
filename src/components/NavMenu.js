import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../contexts/index';

const NavMenu = () => {
  return (
    <AuthUserContext>
      {authUser => {
        return (
          <div className={css(styles.navMenu)}>
            <div>
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
    border: '2px solid yellow',
    justifyContent: 'space-between',
    padding: '20px 35px'
  },
  navLinks: {
    display: 'flex',
    border: '2px solid yellow',
    justifyContent: 'space-between'
  },
  navButton: {
    padding: '10px 20px',
    ':hover': {
      background: '#898989'
    }
  }
});

export default NavMenu;
