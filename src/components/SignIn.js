import React from 'react';
import StandardForm from './StandardForm';
import {auth} from '../firebase/index';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
        console.log(`${authUser.email} sighned in successfully`);
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

export default SignIn;
