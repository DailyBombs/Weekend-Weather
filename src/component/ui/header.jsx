import React, { Component } from 'react';
import Login from '../login/login';
import Logout from '../logout/logout';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      isActive: true,
    });
  }

  render() {
    return (
      <div className="Header">
        <Login
          authenticated={this.props.authenticated}
          authWithFacebook={this.props.authWithFacebook}
          lastVisit={this.props.lastVisit}
        />
        <a href="/">Hem</a> -
        <a href="/profile">Profil</a> -
        <a href="/users">Användare</a>
        <Logout
          authenticated={this.props.authenticated}
          photoURL={this.props.photoURL}
        />
      </div>
    );
  }
}
