import React from 'react';
import { withRouter } from 'react-router-dom';
import { firebase } from '../firebase/index';
import { AuthUserContext } from '../contexts/index';
import * as routes from '../constants/routes';

const withAuthorization = (authCondition) => (Component) => {
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null
      };
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if(!authCondition(authUser)) {
          this.props.history.push(routes.SIGN_IN);
        }
      });
    }

    render() {
      const { currentUser } = this.props;
      return (
        <AuthUserContext.Consumer>
          {authUser => {
            if(authUser) {
              // Don't forget to pass along props,
              // Refactor this to be more general later...
              return <Component currentUser={currentUser}/>
            }
            return null;
          }}
        </AuthUserContext.Consumer>
      );
    }
  }

  return withRouter(WithAuthorization);
}

export default withAuthorization;
