import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IncidentSection from './IncidentSection.Component';

//styling
import './IncidentList.scss';

/**
 * @class IncidentList
 */
export default class IncidentList extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Method to get incident flag Icon
   * @param {string} flagType - incident flag type
   * @returns {string} flagType URL
   */
  getIncidentFlag = flag => {
    if (flag.toLowerCase() === 'green') {
      return this.state.flags.green;
    } else if (flag.toLowerCase() === 'yellow') {
      return this.state.flags.yellow;
    } else {
      return this.state.flags.red;
    }
  };

  /**
   * sorts incidents by type
   */
  sortIncidentsByType = incidentType =>
    this.props.incidents.length ? this.props.incidents.filter(incident => incident.Status.status == incidentType) : [];

  render() {
    return (
      <div className="all-incidents">
        <div className="incidents incidents-pending">
          <IncidentSection
            incidentStatus={'PENDING'}
            incidents={this.sortIncidentsByType('Pending')} // replace with pending data from api
          />
        </div>
        <div className="incidents incidents-progress">
          <IncidentSection
            incidentStatus={'IN PROGRESS'}
            incidents={this.sortIncidentsByType('In Progress')} // replace with pending data from api
          />
        </div>
        <div className="incidents incidents-resolved">
          <IncidentSection
            incidentStatus={'RESOLVED'}
            incidents={this.sortIncidentsByType('Resolved')} // replace with pending data from api
          />
        </div>
      </div>
    );
  }
}

/**
 * PropTypes
 */

IncidentList.propTypes = {
  incidents: PropTypes.array
};
