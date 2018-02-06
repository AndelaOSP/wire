import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IncidentCard extends Component {
  constructor(props) {
    super(props);
  }
  
  render () {
    return (
      <div className="incident-card">
        <div className="incident-header">
          <span className="incident-subject">
            {this.props.incidentSubject}
          </span>
          <span className="incident-report-date">
            {this.props.incidentReportDate}
          </span>
        </div>
        <div className="incident-actions">
          <span className="incident-time">
            {this.props.incidentTime}
          </span>
          <span className="assigned-to">
            {this.props.incidentHandler}
          </span>
          <span className="incident-flag">
            <i className="material-icons">{this.props.incidentFlag}</i>
          </span>
        </div>
      </div>
    );
  }
}

const { string } = PropTypes;

IncidentCard.protoType = {
  incidentSubject: string.isRequired,
  incidentReportDate: string.isRequired,
  incidentTime: string.isRequired,
  incidentHandler: string.isRequired,
  incidentFlag: string.isRequired,
};

export default IncidentCard;
