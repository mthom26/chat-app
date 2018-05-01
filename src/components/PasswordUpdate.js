import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import StandardForm from './StandardForm';
import { auth } from '../firebase/index';
import * as colors from '../constants/colors';

class PasswordUpdate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formComponents: {
        password: true
      },
      error: null,
      message: null
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(data) {
    auth.doPasswordUpdate(data.password)
      .then(() => {
        this.setState({message: 'Password reset successfully!'});
      })
      .catch(error => {
        this.setState({error: error});
      });
  }

  render() {
    const { formComponents, error, message } = this.state;

    return (
      <div className={css(styles.outerContainer)}>
        <StandardForm
          formComponents={formComponents}
          onSubmitAction={this.onSubmit}
          formStyling={css(styles.form)}
          inputStyling={css(styles.input)}
          submitStyling={css(styles.submit)}
        />
        {error && <div>{error.message}</div>}
        {message && <div>{message}</div>}
      </div>
    );
  }
}

const styles = StyleSheet.create({
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

export default PasswordUpdate;
