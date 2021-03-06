import React from 'react';
import { withRouter } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import StandardForm from './StandardForm';
import { auth, db } from '../firebase/index';
import * as routes from '../constants/routes';
import * as colors from '../constants/colors';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectTarget: routes.HOME,
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
        authUser.updateProfile({displayName: data.userName})
          .then(() => console.log('updated displayName'));

        db.doCreateUser(authUser.uid, data.userName, data.email)
          .then(() => {
            const { redirectTarget } = this.state;
            this.props.history.push(redirectTarget);
          })
          .catch(error => {
            this.setState({error: error});
            console.log(error);
          })
      })
      .catch(error => {
        this.setState({error: error});
        console.log(error);
      });
  }

  render() {
    return (
      <div className={css(styles.outerContainer)}>
        <StandardForm
          formComponents={this.state.formComponents}
          onSubmitAction={this.onSignUp}
          formStyling={css(styles.form)}
          inputStyling={css(styles.input)}
          submitStyling={css(styles.submit)}
        />
      </div>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  input: {
    borderTop: '2px solid rgba(0,0,0,0)',
    borderBottom: '2px solid rgba(0,0,0,0)',
    marginTop: '15px',
    padding: '10px',
    background: 'rgba(0,0,0,0.5)',
    ':focus': {
      borderBottom: `2px solid ${colors.yellow}`
    }
  },
  submit: {
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '15px',
    background: colors.yellow,
    padding: '10px 30px'
  }
});

export default withRouter(SignUp);
