import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Watcher from '../watcher/watcher';

export default class WatcherList extends Component {

  constructor(props) {
    super(props);

    this.state = ({
      active: true,
    });
  }

  render() {

    const {
      expanded,
      data,
    } = this.props;

    return (
      <div
        className={`ShoppingList ${expanded ? ' ShoppingList--expanded' : ''}`}
      >
        <div className="ShoppingList__Header"><h2>Watcher List</h2></div>
        <table border="1">
          <tbody>
            <tr
              className="ShoppingList__Item"
              onClick={() => this.handleRemoveNote(this.props.userID, this.props.noteID)}
            >
              <td>Min Temp:</td>
              <td>Max Temp:</td>
              <td>Status</td>
              <td>Min Nederbörd:</td>
              <td>Max Nederbörd:</td>
              <td>Status</td>
            </tr>
          </tbody>
          {
            data.map(dataItem => (
              <Watcher
                userID={dataItem.userID}
                key={dataItem.ID}
                noteID={dataItem.ID}
                data={dataItem}
              />
            ))
          }
        </table>
      </div>
    );
  }
}