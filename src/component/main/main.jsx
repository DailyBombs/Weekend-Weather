import React, { Component } from 'react';
import Watchers from '../watchers/watchers';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      isActive: true,
    });
  }

  render() {
    return (
      <div className="Main">
        <Watchers userID={this.props.userID} />
      </div>
    );
  }
}
