import React, { Component } from 'react';
import { initializeFirebase } from '../config/config';

export default class Users extends Component {
  constructor() {
    super();

    this.state = ({
      users: [],
    });

    this.app = initializeFirebase;
    this.UserScope = this.app.database().ref('/users/');
    this.requestPartner = this.requestPartner.bind(this);
  }

  componentWillMount() {
    const previousUsers = this.state.users;

    this.UserScope.on('child_added', (snap) => {

      // Get current user randomly generated ID to local state
      if (snap.val().UID === this.props.userID) {
        this.setState({
          ...this.state,
          PostID: snap.key,
        });
      }

      previousUsers.push({
        ID: snap.key,
        UserID: snap.val().UID,
        UserName: snap.val().displayName,
      });


      this.setState({
        ...this.state,
        users: previousUsers,
      });

    });
  }

  requestPartner(UserPostID, UserID) {
    initializeFirebase.database().ref('/users/').child(UserID).update({
      PartnerID: this.props.userID,
      PartnerRequestConfirmed: false,
    });

    initializeFirebase.database().ref('/users/').child(this.props.userID).update({
      PartnerID: UserID,
      PartnerRequestConfirmed: true,
    });
  }

  render() {
    return (
      <div>
        {
          this.state.users.map((data) => {
            if (this.props.userID !== data.UserID) {
              return (
                <button
                  key={data.ID}
                  onClick={() => this.requestPartner(data.ID, data.UserID)}
                >
                  <h1>{data.UserName} - {data.UserID}</h1>
                </button>
              );
            }

            return null;
          })
        }
      </div>
    );
  }
}
