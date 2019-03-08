import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IncidentSection from './IncidentSection.Component';
import IncidentType from '../IncidentType/IncidentType.Component';
import './IncidentList.scss';

class IncidentList extends Component {
  getUnderlineColor = (status) => {
    if (status === 'Pending') {
      return '#fdb237';
    } if (status === 'In Progress') {
      return '#49abb0';
    } if (status === 'Resolved') {
      return '#3960ad';
    }
  };

  sortIncidentsByType = incidentType => (this.props.incidents.length ? this.props.incidents
    .filter(incident => incident.Status.status === incidentType) : []);

  render() {
    const { incidentsType } = this.props;
    return incidentsType !== 'All Incidents' ? (
      <div className="all">
        <div className="incident-type">
          <IncidentType
            incidentStatus={incidentsType.toUpperCase()}
            underLineColor={this.getUnderlineColor(incidentsType)}
            incidents={this.props.incidents}
          />
        </div>
      </div>
    ) : (
      <div className="all-incidents">
        <div className="incidents incidents-pending">
          <IncidentSection
            incidentStatus="PENDING"
            underLineColor={this.getUnderlineColor('Pending')}
            incidents={this.sortIncidentsByType('Pending')}
          />
        </div>
        <div className="incidents incidents-progress">
          <IncidentSection
            incidentStatus="IN PROGRESS"
            underLineColor={this.getUnderlineColor('In Progress')}
            incidents={this.sortIncidentsByType('In Progress')}
          />
        </div>
        <div className="incidents incidents-resolved">
          <IncidentSection
            incidentStatus="RESOLVED"
            underLineColor={this.getUnderlineColor('Resolved')}
            incidents={this.sortIncidentsByType('Resolved')}
          />
        </div>
      </div>
    );
  }
}

IncidentList.propTypes = {
  incidents: PropTypes.array,
  incidentsType: PropTypes.string,
};

IncidentList.defaultProps = {
  incidents: [],
  incidentsType: '',
};

export default IncidentList;
