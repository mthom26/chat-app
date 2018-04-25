/*---------------------------------------------------------/
    StandardForm is dynamic, displaying inputs conditionally
    depending on the formComponents prop. It's values are
    passed to the props.onSubmit function as an object. The
    onSubmit function then can choose whatever values it
    needs from the object.
/---------------------------------------------------------*/

import React from 'react';

const INITIAL_STATE = {
  userName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  error: null
};

class StandardForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onPasswordConfirmChange = this.onPasswordConfirmChange.bind(this);
  }

  onSubmit = (event) => {
    event.preventDefault();
    const data = { ...this.state };
    this.setState({ ...INITIAL_STATE });
    this.props.onSubmitAction(data);
  }

  onUserNameChange = (event) => {
    this.setState({userName: event.target.value});
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value});
  }

  onPasswordConfirmChange = (event) => {
    this.setState({passwordConfirm: event.target.value});
  }

  render() {
    const {
      userName,
      email,
      password,
      passwordConfirm,
      error
    } = this.state;

    const {
      formComponents,
      formStyling,
      inputStyling,
      submitStyling
    } = this.props;

    return (
      <form className={formStyling}>
        {formComponents.userName &&
          <input
            value={userName}
            name="userName"
            placeholder="User Name"
            type="text"
            onChange={this.onUserNameChange}
            className={inputStyling}
          />}

        {formComponents.email &&
        <input
          value={email}
          name="email"
          placeholder="Email Address"
          type="text"
          onChange={this.onEmailChange}
          className={inputStyling}
        />}

        {formComponents.password &&
        <input
          value={password}
          name="password"
          placeholder="Password"
          type="password"
          onChange={this.onPasswordChange}
          className={inputStyling}
        />}

        {formComponents.passwordConfirm &&
        <input
          value={passwordConfirm}
          name="passwordConfirm"
          placeholder="Confirm Password"
          type="password"
          onChange={this.onPasswordConfirmChange}
          className={inputStyling}
        />}

        <div
          onClick={this.onSubmit}
          className={submitStyling}
        >
          Submit
        </div>
      </form>
    );
  }
}

export default StandardForm;
