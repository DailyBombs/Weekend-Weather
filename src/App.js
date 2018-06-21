import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'firebase/database';
import { initializeFirebase, facebookProvider } from './component/config/config';
import { Intent } from '@blueprintjs/core';

import Header from './component/ui/header';
import Feedback from './component/ui/feedback';
import Main from './component/main/main';
import Profile from './component/profile/profile';
import Users from './component/users/users';

class App extends Component {
  constructor(props) {
    super(props);

    this.authWithFacebook = this.authWithFacebook.bind(this);

    // this.database = initializeFirebase.database().ref(`/notes/${this.props.userID}/`);
    this.getUserDataScope = initializeFirebase.database().ref(`/users/${this.props.userID}/`);

    this.getFeedbackMessage = this.getFeedbackMessage.bind(this);

    this.state = {
      authenticated: Boolean,
      loading: Boolean,
    };
  }

  componentWillMount() {
    initializeFirebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          ...this.state,
          authenticated: true,
          userID: user.uid,
          loading: false,
          userDetails: {
            displayName: user.displayName,
            email: user.email,
            UID: user.uid,
            creationTime: user.metadata.creationTime,
            lastSignInTime: user.metadata.lastSignInTime,
            photoURL: user.photoURL,
          },
        });

        initializeFirebase.database()
          .ref(`/users/${this.state.userID}`)
          .once('value')
          .then((snapshot) => {
            if (snapshot.val()) {
              // User exist
              if (snapshot.val().PartnerID != null && !snapshot.val().PartnerRequestConfirmed) {
                this.setState({ ...this.state, PartnerRequest: true });
              } else {
                this.setState({ ...this.state, PartnerRequest: false });
              }
            } else {
              // User not found
            }
          });
      } else {
        this.setState({
          ...this.state,
          authenticated: false,
          userID: '',
          loading: false,
        });
      }
    });
  }

  getFeedbackMessage() {
    if (this.state.PartnerRequest) {
      return 'Du har en vänförfrågan att besvara!';
    }
  }

  authWithFacebook() {
    initializeFirebase.auth().signInWithPopup(facebookProvider)
      .then((result, error) => {
        if (error) {
          this.toaster.show({ intent: Intent.DANGER, message: 'Unable to sign in with Facbeook' });
        } else {
          initializeFirebase.database()
            .ref('/users/')
            .orderByChild('UID')
            .equalTo(result.user.uid)
            .once('value')
            .then((snapshot) => {
              if (snapshot.val()) {
                // User exist
              } else {
                // User does not exist
                this.createUserScope = initializeFirebase.database().ref('/users/').child('PARTNER_CHILD');

                this.createUserScope.set({
                  displayName: result.user.displayName,
                  email: result.user.email,
                  UID: result.user.uid,
                  creationTime: result.user.metadata.creationTime,
                  lastSignInTime: result.user.metadata.lastSignInTime,
                  photoURL: result.user.photoURL,
                });
              }
            });
        }
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <h2>Laddar</h2>
      );
    }

    if (this.state.authenticated) {

      return (
        <div className="content">
          <Header
            authWithFacebook={this.authWithFacebook}
            lastVisit={this.state.userDetails.lastSignInTime}
            authenticated={this.state.authenticated}
            photoURL={this.state.userDetails.photoURL}
          />
          <Feedback message={this.getFeedbackMessage()} />
          <Router>
            <div>
              <Route exact path="/" render={() => <Main userID={this.state.userID} />} />
              <Route path="/profile" component={Profile} />
              <Route path="/users" render={() => <Users userID={this.state.userID} />} />
            </div>
          </Router>
        </div>
      );
    }

    return (
      <div>
        <Header
          authWithFacebook={this.authWithFacebook}
          lastVisit={this.state.userDetails}
          authenticated={this.state.authenticated}
        />
      </div>
    );

  }
}

export default App;
