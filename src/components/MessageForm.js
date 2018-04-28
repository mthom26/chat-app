import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import * as colors from '../constants/colors';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    event.preventDefault();
    this.setState({message: event.target.value});
  }

  render() {
    const { message } = this.state;

    return (
      <div className={css(styles.messageForm)}>
        <input
          className={css(styles.input)}
          type="text"
          placeholder="Enter message here..."
          name="message"
          onChange={this.onChange}
          value={message}
        />
        <div className={css(styles.submit)}>SEND</div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  messageForm: {
    border: `1px solid cyan`,
    display: 'flex',
    padding: '15px'
  },
  input: {
    flexBasis: '92%',
    borderTop: '2px solid rgba(0,0,0,0)',
    borderBottom: '2px solid rgba(0,0,0,0)',
    padding: '10px',
    background: 'rgba(0,0,0,0.5)',
    ':focus': {
      borderBottom: `2px solid ${colors.yellow}`
    }
  },
  submit: {
    display: 'flex',
    justifyContent: 'center',
    flexBasis: '8%',
    cursor: 'pointer',
    fontWeight: 'bold',
    background: colors.yellow,
    padding: '10px 30px'
  }
});

export default MessageForm;
