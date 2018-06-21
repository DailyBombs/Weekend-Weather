import React, { Component } from 'react';

export default class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }

  render() {
    if (this.props.message) {
      return (
        <div className="Feedback">
            {this.props.message}
        </div>
      );
    }
    return null;
  }
}
