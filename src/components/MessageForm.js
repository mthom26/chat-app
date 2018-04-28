import React from 'react';
import { StyleSheet, css } from 'aphrodite';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  function onChange(event) {
    event.preventDefault();
    this.setState({message: event.target.value});
  }

  render() {
    const { message } = this.state;
    
    return (
      <div>
        <input
          type="text"
          placeholder="Enter message here..."
          name="message"
          onChange={this.onChange}
          value={message}
        />
        <div>SEND</div>
      </div>
    );
  }
}

const styles = StyleSheet.create({

});

export default MessageForm;
