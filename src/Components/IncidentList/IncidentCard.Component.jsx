import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class IncidentCard extends Component {
  constructor(props) {
    super(props);
  }

  renderFlag = flagLevel => {
    if (flagLevel.toLowerCase() == 'red') {
      return <img className="flag-image" src="/assets/images/red_flag.svg" alt="red" />;
    } else if (flagLevel.toLowerCase() == 'green') {
      return <img className="flag-image" src="/assets/images/green_flag.svg" alt="green" />;
    } else {
      return <img className="flag-image" src="/assets/images/yellow_flag.svg" alt="yellow" />;
    }
  };

  generateInitials = assignee => {
    let names = assignee.username.split(' ');
    let firstInitial = names[0][0].toUpperCase();
    let secondInitial = names[1][0].toUpperCase();
    return firstInitial + secondInitial;
  };

  trimText = (text, length) => {
    return text.length > length ? text.substring(0, length) + ' ...' : text;
  };

  render() {
    const {
      incidentId,
      incidentSubject,
      incidentDescription,
      incidentReportDate,
      incidentTime,
      incidentFlag,
      assignees
    } = this.props;
    return (
      <div className="incident-card">
        <Link to={`/timeline/${incidentId}`}>
          <div className="card-header">
            <div className="incident-report-date">{incidentReportDate}</div>
            <div className="incident-time">{incidentTime}</div>
            <div className="incident-flag">{this.renderFlag(incidentFlag)}</div>
          </div>
          <div className="incident-subject">{this.trimText(incidentSubject, 30)}</div>
          <div className="incident-description">{this.trimText(incidentDescription, 280)}</div>
          <div className="assigned-to">
            {assignees.length ? (
              assignees.map((assignee, index) => (
                <div className="assignee" key={index} style={{ backgroundColor: index == 0 ? '#fbaf31' : '#358fe2' }}>
                  {this.generateInitials(assignee)}
                </div>
              ))
            ) : (
              <div className="unassigned">Unassigned</div>
            )}
          </div>
        </Link>
      </div>
    );
  }
}

const { string, number, oneOfType, array } = PropTypes;

IncidentCard.propTypes = {
  incidentId: oneOfType([string, number]),
  incidentSubject: string.isRequired,
  incidentDescription: string,
  incidentReportDate: string.isRequired,
  incidentTime: string.isRequired,
  incidentFlag: string.isRequired,
  assignees: array.isRequired
};

export default IncidentCard;
