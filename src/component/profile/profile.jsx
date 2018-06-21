import React, { Component } from 'react';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      isActive: true,
    });
  }

  render() {
    return (
      <div className="Profile">
        Din profil
      </div>
    );
  }
}
