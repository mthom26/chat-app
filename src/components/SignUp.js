import React from 'react';
import { withRouter } from 'react-router-dom';
import StandardForm from './StandardForm';
import { auth, db } from '../firebase/index';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectTarget: '/home',
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
            const { redirectTarget } = this.state;
            this.props.history.push(redirectTarget);
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

export default withRouter(SignUp);
