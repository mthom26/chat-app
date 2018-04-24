import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';

const NavMenu = () => {
  return (
    <div className={css(styles.navMenu)}>
      <div>
        LOGO
      </div>
      <div>
        <div className={css(styles.navLinks)}>
          <Link className={css(styles.navButton)} to="/home">HOME</Link>
          <Link className={css(styles.navButton)} to="/signin">SIGN IN</Link>
          <Link className={css(styles.navButton)} to="/signup">SIGN UP</Link>
        </div>
      </div>
    </div>
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
