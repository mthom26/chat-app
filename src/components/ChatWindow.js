import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../firebase/firebase';
import { db as database } from '../firebase/index';
import MessageForm from './MessageForm';

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messageList: null
    };

    this.db = db.ref('rooms/main');
    this.onMessageSubmit = this.onMessageSubmit.bind(this);
  }

  onMessageSubmit(message) {
    const name = this.props.authUser.displayName;
    database.doCreateMessage('main', name, message);
  }

  componentDidMount() {
    this.db.on('value', (snap) => {
      this.setState({messageList: snap.val()});
    });
  }

  componentWillUnmount() {
    this.db.off();
  }

  render() {
    return (
      <div className={css(styles.chatWindow)}>
        Chat Window
        <MessageForm onMessageSubmit={this.onMessageSubmit}/>
      </div>
    );
  }
};

const styles = StyleSheet.create({
  chatWindow: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '75%',
    border: '1px solid yellow',
    margin: '25px',
    padding: '10px'
  }
});

export default ChatWindow;
