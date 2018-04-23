import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const NavMenu = () => {
  return (
    <div className={css(styles.navMenu)}>
      <div>
        LOGO
      </div>
      <div>
        <div className={css(styles.navLinks)}>
          <div>Home</div>
          <div>Sign In</div>
          <div>Register</div>
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
  }
});

export default NavMenu;
