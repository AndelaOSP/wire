import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IncidentCard from './IncidentCard.Component';

// import styling
import './IncidentList.scss';

class IncidentSection extends Component {
  constructor(props) {
    super(props);
  }

  getTime = timestamp => new Date(timestamp).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  getDate = timestamp =>
    new Date(timestamp).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

  render() {
    const { incidentStatus, incidents, underLineColor } = this.props;
    return (
      <div>
        <div className="incident-cards">
          <span className="incident-status">{incidentStatus}</span>
          <div className="underline" style={{backgroundColor: underLineColor}}/>
          {incidents.length ? (
            incidents.map(incident => (
              <IncidentCard
                key={incident.id}
                incidentId={incident.id}
                incidentSubject={incident.subject}
                incidentDescription={incident.description || 'No Description'}
                incidentReportDate={`reported on ${this.getDate(incident.dateOccurred)} at`}
                incidentTime={this.getTime(incident.dateOccurred)}
                incidentFlag={incident.Level.name}
                assignees={incident.assignees}
              />
            ))
          ) : (
            <div className="no-incidents">
              <img className="folder" src="/assets/images/open_folder.png" alt="No incidents" />
              <p> No incidents <br/>in <span className="status">{this.props.incidentStatus.toUpperCase()}</span></p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

// desructure proptypes
const { string, array } = PropTypes;

IncidentSection.propTypes = {
  incidentStatus: string.isRequired,
  incidents: array.isRequired,
  underLineColor: string
};

export default IncidentSection;
