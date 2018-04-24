import React from 'react';
import withAuthorization from '../hocs/withAuthorization';
import { AuthUserContext } from '../contexts/index';

const ProfilePage = (props) => {
  return (
    <AuthUserContext.Consumer>
      {authUser => {
        return (
          <div>
            <h2>Profile page for: {authUser.email}</h2>
          </div>
        );
      }}
    </AuthUserContext.Consumer>
  );
}

const authCondition = (authUser) => {
  if(authUser) {
    return true;
  } else {
    return false;
  }
}

export default withAuthorization(authCondition)(ProfilePage);
