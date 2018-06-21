import React, { Component } from 'react';
import MyMap from '../../map/Map';

export default class WatchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minDayTemperature: 0,
      maxDayTemperature: 0,
      minPercipitation: 0,
      maxPercipitation: 0,
      minWindSpeed: 0,
      maxWindSpeed: 0,
      coordinates: {}
    };

    this.handleUserInput_MinDayTemp = this.handleUserInput_MinDayTemp.bind(this);
    this.handleUserInput_MaxDayTemp = this.handleUserInput_MaxDayTemp.bind(this);
    this.handleUserInput_MinPercipitation = this.handleUserInput_MinPercipitation.bind(this);
    this.handleUserInput_MaxPercipitation = this.handleUserInput_MaxPercipitation.bind(this);
    this.writeNote = this.writeNote.bind(this);
  }

  componentDidUpdate() {
    if (!this.state.coordinates === 0) {
      this.noteName.focus();
    }
  }

  handleUserInput_MinDayTemp(event) {
    this.setState({
      ...this.state,
      coordinates: this.Map.state.coordinates,
      minDayTemperature: event.target.value,
    });
  }

  handleUserInput_MaxDayTemp(event) {
    this.setState({
      maxDayTemperature: event.target.value,
    });
  }

  handleUserInput_MinPercipitation(event) {
    this.setState({
      minPercipitation: event.target.value,
    });
  }
  handleUserInput_MaxPercipitation(event) {
    this.setState({
      maxPercipitation: event.target.value,
    });
  }

  writeNote() {

    this.setState({
      ...this.state,
      coordinates: this.Map.state.coordinates,
    })

    this.props.addNote(this.state);

    this.setState({
      newNoteContent: '',
    });
  }

  render() {
    return (
      <div>
        <h5>Watcher form</h5>

        <div>
          <input
            ref={(input) => { this.noteName = input; }}
            placeholder="Minsta temperatur"
            value={this.state.minDayTemperature}
            onChange={this.handleUserInput_MinDayTemp}
          />
          <input
            ref={(input) => { this.noteName = input; }}
            placeholder="Högsta temperatur"
            value={this.state.maxDayTemperature}
            onChange={this.handleUserInput_MaxDayTemp}
          />
          <input
            ref={(input) => { this.noteName = input; }}
            placeholder="Minsta vindstyrka"
            value={this.state.minPercipitation}
            onChange={this.handleUserInput_MinPercipitation}
          />
          <input
            ref={(input) => { this.noteName = input; }}
            placeholder="Högsta vindstyrka"
            value={this.state.maxPercipitation}
            onChange={this.handleUserInput_MaxPercipitation}
          />
          <input
            // ref={(input) => { this.noteName = input; }}
            placeholder="longitude"
            value={this.state.coordinates.lng}
          />
          <input
            // ref={(input) => { this.noteName = input; }}
            placeholder="latitude"
            value={this.state.coordinates.lat}
          />
        </div>

        <MyMap
          ref={(Map) => {this.Map = Map;}}
        />

        <button onClick={this.writeNote}>Add watcher</button>
      </div>
    );
  }
}
