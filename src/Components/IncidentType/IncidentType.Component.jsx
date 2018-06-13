import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IncidentCard from '../IncidentList/IncidentCard.Component';

// import styling
import './IncidentType.scss';

class IncidentType extends Component {
  constructor(props) {
    super(props);
  }

  getTime = timestamp =>
    new Date(timestamp).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  getDate = timestamp =>
    new Date(timestamp).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

  render() {
    const { incidentStatus, incidents, underLineColor } = this.props;
    const cards = incidents.map(incident => (
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
    ));
    const renderCards = [];

    for (let i = 1; i < cards.length + 1; i++) {
      renderCards.push(cards[i - 1]);
      if (i % 2 == 0) {
        renderCards.push(<div key={i - 100} className="dotted-line" />);
      }
    }

    return (
      <div className="type-wrapper">
        <span className="incident-type-status">{incidentStatus}</span>
        <div className="incident-type-underline" style={{ backgroundColor: underLineColor }} />
        <div className="incident-type-cards">
          {incidents.length ? (
            renderCards
          ) : (
            <div className="type-no-incidents">
              <img className="folder" src="/assets/images/open_folder.png" alt="No incidents" />
              <p>
                {' '}
                No incidents <br />in <span className="status">{this.props.incidentStatus.toUpperCase()}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

// desructure proptypes
const { string, array } = PropTypes;

IncidentType.propTypes = {
  incidentStatus: string.isRequired,
  underLineColor: string,
  incidents: array.isRequired
};

export default IncidentType;
