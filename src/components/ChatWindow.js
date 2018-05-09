import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../firebase/firebase';
import { db as database } from '../firebase/index';
import MessageForm from './MessageForm';
import { convertTimestamp } from '../helpers/index';

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      previousMessages: [],
      messageList: []
    };

    this.db = db.ref('rooms/main');
    this.onMessageSubmit = this.onMessageSubmit.bind(this);
  }

  onMessageSubmit(message) {
    const name = this.props.authUser.displayName;
    const profileimage = this.props.currentUser.profileurl;
    database.doCreateMessage('main', name, message, profileimage);
  }

  componentDidMount() {
    // First we want to obtain the 10 most recent messages from the db,
    // then attach a 'child_added' listener
    this.db.limitToLast(10).once('value')
      .then(snap => {
        const messages = snap.val();
        let messageArray = [];
        messageArray = Object.keys(messages).map(key => {
          return messages[key];
        });
        this.setState(() => ({previousMessages: messageArray}));
      })
      .catch(error => console.log(error));

    this.db.limitToLast(1).on('child_added', (snap) => {
      const prevMessages = this.state.messageList;
      prevMessages.push(snap.val());
      this.setState(() => ({messageList: prevMessages}));
    });
  }

  componentWillUnmount() {
    this.db.off();
  }

  render() {
    const { messageList, previousMessages } = this.state;

    // Slice the first message off the messageList as it was already
    // fetched in the previousMessages array
    const finalArray = previousMessages.concat(messageList.slice(1));

    return (
      <div className={css(styles.chatWindow)}>
        Chat Window
        {finalArray.length && finalArray.map(message => (
          <div className={css(styles.message)} key={message.id}>
            <div className={css(styles.imagediv)}>
              <img alt="" className={css(styles.image)} src={message.profileimage}/>
            </div>

            <div className={css(styles.messageContent)}>
              <div className={css(styles.messageMeta)}>
                <span className={css(styles.username)}>{message.username}</span>
                <span className={css(styles.date)}> - {convertTimestamp(message.timestamp).toString()}</span>
              </div>
              <div>
                <span>{message.message}</span>
              </div>
            </div>
          </div>
        ))}
        <MessageForm onMessageSubmit={this.onMessageSubmit}/>
      </div>
    );
  }
};

const styles = StyleSheet.create({
  username: {
    fontSize: '1.2rem'
  },
  date: {
    fontSize: '0.8rem',
    opacity: '0.7'
  },
  imagediv: {
    border: '1px solid orange',
    width: '60px',
    height: '60px',
    marginRight: '0.8rem'
  },
  image: {
    maxWidth: '60px'
  },
  messageMeta: {
    marginBottom: '0.4rem'
  },
  messageContent: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid cyan'
  },
  message: {
    display: 'flex',
    margin: '0.5rem 0'
  },
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
