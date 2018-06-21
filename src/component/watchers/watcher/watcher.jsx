import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { initializeFirebase } from '../../config/config';
import { removeNote } from '../../functions/helpers';

class Watcher extends Component {
  constructor(props) {
    super(props);

    this.app = initializeFirebase;
    this.noteID = props.noteID;

    this.handleRemoveNote = this.handleRemoveNote.bind(this);
    this.getTemperatureStatus = this.getTemperatureStatus.bind(this);
    this.getPercepitationStatus = this.getPercepitationStatus.bind(this);

    this.state = {
      ...this.state,
      fetchedData: {},
      temperature: false,
      temperatureFailsAt: 0
    }
  }

  componentWillMount() {

    const latitude = this.props.data.Specs.coordinates.lat;
    const longitude = this.props.data.Specs.coordinates.lng;


    fetch(`http://localhost:8888/Personal%20Projects/Weekend%20Weather%20PHP/get_yr.php?lat=${latitude}&lon=${longitude}`)
    .then(results => {
      return results.json();
    }).then(data => {
      console.log(data);
      this.setState({
        // ...this.state,
        fetchedData: data,
        fetched: true
      })
    });
  }

  getTemperatureStatus() {

    console.log('\n\nChecking temperature');

    let tempStatus = new Boolean(true);

    this.state.fetchedData.length > 0 &&
      this.state.fetchedData.map((data) => {

        const minTemp = this.props.data.Specs.minDayTemperature;
        const maxTemp = this.props.data.Specs.maxDayTemperature;

        const dataTemp = data.temperature;

        if (data.weekend) {
          if ((dataTemp >= minTemp) && (dataTemp <= maxTemp)) {
            console.log(minTemp, maxTemp, ' Was: ', data.temperature);
          } else {
            tempStatus = false;
            console.log(minTemp, maxTemp, ' Was: ', data.temperature, ' FAIL');
          }
        }

      });

      return tempStatus.toString();

  }

  getPercepitationStatus() {

    console.log('\n\nChecking percepitation');

    let percepitationStatus = new Boolean(true);

    this.state.fetchedData.length > 0 &&
      this.state.fetchedData.map((data) => {

        const minPercipitation = this.props.data.Specs.minPercipitation;
        const maxPercipitation = this.props.data.Specs.maxPercipitation;

        const percepitationValue = data.percipitation[0].value;


        if (data.weekend) {
          if ((percepitationValue >= minPercipitation) && (percepitationValue <= maxPercipitation)) {
            console.log(minPercipitation, maxPercipitation, ' Was: ', percepitationValue);
          } else {
            percepitationStatus = false;
            console.log(minPercipitation, maxPercipitation, ' Was: ', percepitationValue, ' FAIL');
          }
        }

      });

      return percepitationStatus.toString();

  }

  handleRemoveNote(userID, noteID) {
    removeNote(userID, noteID);
  }

  render() {

    const {
      minDayTemperature,
      maxDayTemperature,
      minPercipitation,
      maxPercipitation,
    } = this.props.data.Specs;

    let temperature;
    let percipitation;

    if (this.props.data) {
      return (
        <tr
          className="ShoppingList__Item"
          onClick={() => this.handleRemoveNote(this.props.userID, this.props.noteID)}
        >
          <td>{ minDayTemperature }</td>
          <td>{ maxDayTemperature }</td>
          <td>{ this.getTemperatureStatus() } </td>
          <td>{ minPercipitation }</td>
          <td>{ maxPercipitation }</td>
          <td>{ this.getPercepitationStatus() } </td>
        </tr>
      );
    } else {
      return <p>Laddar</p>
    }

  }
}

// Watcher.propTypes = {
//   noteContent: PropTypes.string,
// };

export default Watcher;
