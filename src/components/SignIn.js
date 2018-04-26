import React from 'react';
import { withRouter } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import StandardForm from './StandardForm';
import { auth, db } from '../firebase/index';

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
        //db.doSetPresence(authUser.uid, 'Sign In');
        const { redirectTarget } = this.state;
        this.props.history.push(redirectTarget);
      })
      .catch(error => {
        this.setState({error: error})
      });
  }
/*
  onSignIn = (data) => {
    auth.doSignIn(data.email, data.password)
      .then(authUser => {
        const { redirectTarget } = this.state;
        this.props.history.push(redirectTarget);
      })
      .catch(error => {
        this.setState({error: error})
      });
  }*/

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
      borderBottom: '2px solid #F0C667'
    }
  },
  submit: {
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '15px',
    background: '#F0C667',
    padding: '10px 30px'
  }
});

export default withRouter(SignIn);
