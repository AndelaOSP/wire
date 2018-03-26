import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import * as axios from 'axios';
import config from '../../config/index';

// styling
import './Search.scss';

import IncidentCard from '../../Components/IncidentList/IncidentCard.Component';

/**
 * @class SearchComponent
 */
class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incidents: []
    };
  }

  componentDidMount() {
    this.nameInput.focus();
  }

  /**
   * Method to handle search input change
   */
  handleInputChange = () => {
    let searchQuery = this.nameInput.input.value.toLowerCase();
    if (searchQuery) {
      axios.get(config.INCIDENTS_URL + '?q=' + searchQuery).then(response => {
        this.setState({
          incidents: response.data.data.incidents
        });
      });
    } else {
      this.setState({
        incidents: []
      });
    }
  };

  /**
   * Method to exit search
   * @param {event} event - Event triggering exit to dashboard
   */
  handleExit = event => {
    event.preventDefault();
    this.props.history.push('/dashboard');
  };

  getTime = timestamp => new Date(timestamp).toLocaleTimeString();

  getDate = timestamp =>
    new Date(timestamp).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

  render() {
    return (
      <div className="search-container">
        <TextField
          ref={input => (this.nameInput = input)}
          floatingLabelText="Search for an incident"
          fullWidth
          rows={2}
          className="input-style"
          onChange={this.handleInputChange}
        />
        <i className="fa fa-times-circle" title="Click to exit search" onClick={this.handleExit} />
        <div className="incident-cards">
          {this.state.incidents.length
            ? this.state.incidents.map(incident => (
                <IncidentCard
                  key={incident.id}
                  incidentId={incident.id}
                  incidentSubject={incident.subject}
                  incidentReportDate={`reported on ${this.getDate(incident.dateOccurred)}`}
                  incidentTime={this.getTime(incident.dateOccurred)}
                  incidentAsignee={incident.User.name}
                  incidentFlag={incident.Level.name}
                />
              ))
            : null}
        </div>
      </div>
    );
  }
}

/**
 * Search Component Props validation
 */
SearchComponent.propTypes = {
  history: PropTypes.object.isRequired
};

export default SearchComponent;
