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
    const { messageList } = this.state;
    let messageArray = [];
    if(messageList) {
      messageArray = Object.keys(messageList).map(key => {
        return messageList[key];
      });
    }

    return (
      <div className={css(styles.chatWindow)}>
        Chat Window
        {messageArray.length && messageArray.map(message => (
          <div key={message.id}>
            <span>{message.username}</span>
            <span>{message.message}</span>
          </div>
        ))}
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
