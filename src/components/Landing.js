import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className={css(styles.container)}>
      <h2>Welcome!</h2>
      <p>New? <Link to="/signup" className={css(styles.link)}>Sign Up here</Link> or if you already have an account <Link className={css(styles.link)} to="/signin">Sign In.</Link></p>
    </div>
  );
};

const styles = StyleSheet.create({
  link: {
    color: '#F0C667'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Landing;
