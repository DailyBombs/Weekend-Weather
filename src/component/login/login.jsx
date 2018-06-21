import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import 'firebase/database';
import { Toaster } from '@blueprintjs/core';
// import Moment from 'moment';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
    };
  }

  render() {
    if (this.props.authenticated) {
      return (
        <div className="Login">
          {/* <a href="/">{ Moment(this.props.lastVisit).format('YYYY-MM-DD HH:mm') }</a> */}
          {/* Inköpslistan */}
        </div>
      );
    }
    return (
      <div className="Login">
        <Toaster ref={(element) => { this.toaster = element; }} />
        <button onClick={() => this.props.authWithFacebook()}>Logga in med Facebook</button>
      </div>
    );
  }
}

export default Login;
