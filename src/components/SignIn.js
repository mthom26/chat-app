import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import StandardForm from './StandardForm';
import { auth, db } from '../firebase/index';
import * as routes from '../constants/routes';
import * as colors from '../constants/colors';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectTarget: routes.HOME,
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
        //const { updateUser } = this.props;
        //updateUser(authUser.uid);
        this.props.history.push(redirectTarget);
      })
      .catch(error => {
        this.setState({error: error})
      });
  }

  render() {
    return (
      <div className={css(styles.outerContainer)}>
        <StandardForm
          formComponents={this.state.formComponents}
          onSubmitAction={this.onSignIn}
          formStyling={css(styles.form)}
          inputStyling={css(styles.input)}
          submitStyling={css(styles.submit)}
        />
        <p>Forgotten password? <Link className={css(styles.link)} to={routes.PASSWORD_FORGET}>Click here</Link></p>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  link: {
    color: colors.yellow
  },
  outerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
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

export default withRouter(SignIn);
