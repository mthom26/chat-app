import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../firebase/firebase';

class OnlineUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      onlineUserList: null
    };

    this.db = db.ref('usersOnline');
  }

  componentDidMount() {
    this.db.on('value', (snap) => {
      this.setState({onlineUserList: snap.val()});
    });
  }

  componentWillUnmount() {
    this.db.off();
  }

  render() {
    const users = this.state.onlineUserList;
    let usersArray = [];
    if(users) {
      usersArray = Object.keys(users).map(key => {
        return users[key];
      });
    }

    return (
      <div className={css(styles.onlineUsers)}>
        <h3>Online Users</h3>
        {usersArray.length && usersArray.map(user => {
          return (
            <div key={user.id}>{user.name}</div>
          )
        })}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  onlineUsers: {
    flexBasis: '25%',
    border: '1px solid SpringGreen',
    margin: '25px',
    padding: '10px'
  }
});

export default OnlineUsers;
