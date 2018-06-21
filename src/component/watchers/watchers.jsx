import React, { Component } from 'react';
import { initializeFirebase, weatherRequirementScope } from '../config/config';

import WatcherList from './watcher-list/watcher-list';
import WatcherForm from './watcher-form/watcher-form';

export default class Watchers extends Component {

  constructor(props) {
    super(props);

    this.state = ({
      weatherRequirements: [],
      isActive: true,
    });

    this.database = weatherRequirementScope(this.props.userID);

    // this.removeNote = this.removeNote.bind(this);
    this.addNote = this.addNote.bind(this);
    this.addFavourite = this.addFavourite.bind(this);
    this.expandFavourites = this.expandFavourites.bind(this);
  }

  componentWillMount() {
    const previousNotes = this.state.weatherRequirements;

    this.database.on('child_added', (snap) => {
      previousNotes.push({
        ID: snap.key,
        userID: this.props.userID,
        Specs: snap.val().Specs,
      });

      this.setState({
        ...this.state,
        weatherRequirements: previousNotes,
      });
    });

    this.database.on('child_removed', (snap) => {

      // Add item to history log
      //
      // NOT USED IN WW!!
      //
      previousNotes.map((data, index) => {

        if (data.ID === snap.key) {

          // this.dbHistory.push().set({
          //   Deleted: Date.now(),
          //   noteContent: data.notesContent,
          // });

          console.log("list item removed", data.notesContent)

          console.log(this.state)

          previousNotes.splice(index, 1);
        }

        return null;
      });


      this.setState({
        weatherRequirements: previousNotes,
        favouritesExpanded: false,
        notesExpanded: true,
      });
    });

  }

  addFavourite(note) {
    this.dbFavourite.push().set({ favouriteName: note });
  }

  expandFavourites() {
    this.setState({
      favouritesExpanded: !this.state.favouritesExpanded,
      notesExpanded: !this.state.notesExpanded,
    });
  }

  addNote(note) {
    console.log(note);
    // TODO: Add better validation. Do not store whitespace
    if (note) {
      initializeFirebase.database()
        .ref(`/weatherRequirements/${this.props.userID}/`)
        .orderByChild('Specs')
        .equalTo('Hej')
        .once('value')
        .then((snapshot) => {
          if (snapshot.val()) {
            // this.setState({ ...this.state, sendToKey: note, lastFeedback: 'Item exist' });
          } else {
            this.database.push().set({
              Specs: note,
            });
            this.setState({ ...this.state, sendToKey: note, lastFeedback: '+1' });
          }
        });
    }
  }

  render() {
    return (
      <div className="ShoppingListComponent">

        {this.state.weatherRequirements &&

          <WatcherList
            userID={this.props.userID}
            data={this.state.weatherRequirements}
            expanded={this.state.notesExpanded}
          />
        }

        {!this.state.weatherRequirements &&
          <p>Laddar</p>
        }

        <hr />

        <WatcherForm addNote={this.addNote} />

      </div>
    );
  }
}
