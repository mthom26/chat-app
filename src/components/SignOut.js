import React from 'react';
import { auth } from '../firebase/index';

const SignOut = (props) => {
  return (
    <div
      className={props.passedClasses}
      onClick={auth.doSignOut}
    >
      {props.children}
    </div>
  );
};

export default SignOut;
