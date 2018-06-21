import React, { Component } from 'react';

export default class ModeSwitcher extends Component {

  constructor(props) {
    super(props);

    this.state = ({
      active: true,
    });
  }

  componentWillReceiveProps() {
    this.setState({
      animate: true,
    });

    setTimeout(() => {
      this.setState({
        animate: false,
      });
    }, 1000);
  }

  render() {
    return (
      <div
        className="ModeSwitcher"
        role="presentation"
        onClick={() => this.props.expandFavourites()}
      >
        {(this.props.expanded ? 'Visa inköpslistan' : 'Visa favoriter')}
        <div className={(this.state.animate ? 'List__Length List__Length--animate' : 'List__Length')}>{(this.props.expanded ? this.props.notesLength : this.props.favouritesLength)}</div>
      </div>
    );
  }
}
