import React from 'react';
import { withRouter } from 'react-router-dom';
import { firebase } from '../firebase/index';
import { AuthUserContext } from '../contexts/index';

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
          this.props.history.push('/signin');
        }
      });
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => {
            if(authUser) {
              return <Component />
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
