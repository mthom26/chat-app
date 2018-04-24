import React from 'react';
import { withRouter } from 'react-router-dom';
import StandardForm from './StandardForm';
import {auth} from '../firebase/index';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectTarget: '/home',
      formComponents: {
        email: true,
        password: true
      },
      error: null
    };

    this.onSignIn = this.onSignIn.bind(this);
  }

  onSignIn = (data) => {
    auth.doSignIn(data.email, data.password)
      .then(authUser => {
        const { redirectTarget } = this.state;
        this.props.history.push(redirectTarget);
      })
      .catch(error => {
        this.setState({error: error})
      });
  }

  render() {
    return (
      <StandardForm
        formComponents={this.state.formComponents}
        onSubmitAction={this.onSignIn}
      />
    );
  }
}

export default withRouter(SignIn);
