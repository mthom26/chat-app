import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import StandardForm from './StandardForm';
import * as colors from '../constants/colors';
import { auth } from '../firebase/index';

class PasswordForget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formComponents: {
        email: true
      },
      error: null,
      message: null
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(data) {
    auth.doPasswordReset(data.email)
      .then(() => {
        this.setState({message: 'Password Reset email sent!'})
      })
      .catch(error => {
        this.setState({error: error});
      });
  }

  render() {
    const { error, message } = this.state;
    return (
      <div className={css(styles.outerContainer)}>
        <p>Enter your email below and we will send instructions to change your password.</p>
        <StandardForm
          formComponents={this.state.formComponents}
          onSubmitAction={this.onSubmit}
          formStyling={css(styles.form)}
          inputStyling={css(styles.input)}
          submitStyling={css(styles.submit)}
        />
        {message && <div>{message}</div>}
        {error && <div>{error.message}</div>}
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

export default PasswordForget;
