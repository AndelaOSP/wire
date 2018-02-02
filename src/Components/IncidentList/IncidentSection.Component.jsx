import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IncidentCard from './IncidentCard.Component';

// import styling
import './IncidentList.scss';

class IncidentSection extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { incidentStatus, incidents } = this.props;
    return (
      <div>
        <div className="incident-title">
          <span className="incident-status">{incidentStatus}</span>
          <span className="incident-count">{incidents.length} Incidents</span>
        </div>
        <div className="incident-cards">
          {incidents.length
          ? incidents.map((incident) => (
            <IncidentCard
              key={incident.id}
              incidentSubject={incident.subject}
              incidentReportDate={incident.reportDate}
              incidentTime={incident.time}
              incidentHandler={incident.handler}
              incidentFlag={incident.flag}
            />
          ))
          : <div className="no-incidents"> No Incidents {this.props.incidentStatus.toUpperCase()}</div>
          }
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
};

export default IncidentSection;
