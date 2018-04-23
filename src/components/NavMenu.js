import React from 'react';

const styles = {
  display: 'flex',
  border: '2px solid yellow',
  justifyContent: 'space-between'
};

const NavMenu = () => {
  return (
    <div style={{...styles, padding: '15px 30px'}}>
      <div>
        LOGO
      </div>
      <div>
        <div style={styles}>
          <div>Home</div>
          <div>Sign In</div>
          <div>Register</div>
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
