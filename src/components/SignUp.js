import React from 'react';
import StandardForm from './StandardForm';
import { auth, db } from '../firebase/index';

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
    auth.doCreateUser(data.email, data.password)
      .then(authUser => {
        db.doCreateUser(authUser.uid, data.userName, data.email)
          .then(() => {
          })
          .catch(error => {
            this.setState({error: error})
          })
      })
      .catch(error => {
        this.setState({error: error})
      });
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
