import React from 'react';
import StandardForm from './StandardForm';
import {auth} from '../firebase/index';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formComponents: {
        userName: true,
        email: true,
        password: true
      },
      error: null
    };

    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp = (data) => {
    console.log(data);
  }

  render() {
    return (
      <StandardForm
        formComponents={this.state.formComponents}
        onSubmitAction={this.onSignUp}
      />
    );
  }
}

export default SignUp;
