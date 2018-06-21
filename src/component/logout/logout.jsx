import React, { Component } from 'react';
import { initializeFirebase } from '../config/config';


export default class Logout extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }

  // componentWillMount() {
  //     db.auth().signOut().then((user) => {
  //         this.setState({ redirect: true })
  //     })
  // }

  logoutUser() {
    initializeFirebase.auth().signOut().then((user) => {
      console.log(user);

      this.setState({ redirect: true });
    });
  }

  render() {
    // if (this.state.redirect) {
    //     return (
    //         <h1>Hej</h1>
    //     )
    // }
    // return (
    //     <h1>Laddar...</h1>
    // )

    if (this.props.authenticated) {
      return (
        <div className="Logout">
          <div className="Logout__ProfilePic">
            <a href="/profile" onClick={() => this.logoutUser()}><img src={this.props.photoURL} alt='Profile pic' /></a>
          </div>
        </div>
      );
    }
    return (
      <div />
    );
  }
}
