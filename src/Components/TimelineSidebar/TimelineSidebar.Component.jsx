import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import moment from 'moment';

// styling
import './TimelineSidebar.scss';

export default class TimelineSidebar extends Component {
  constructor(props) {
    super(props);
  }

  handleDateString = date => {
    return moment(date).format('MMM Do YYYY [at] h:mm a');
  };

  handleStatusChange = (e, index, value) => {
    e.preventDefault();
    this.props.changeStatus(value, this.props.incident.id);
  };

  handleChangeAssignee = (e, index, value) => {
    e.preventDefault();
    this.props.changeAssignee(value, this.props.incident.id);
  };

  renderFlag = flagLevel => {
    if (flagLevel == 'Red') {
      return <img className="flag-image" src="/assets/images/red_flag.svg" alt="red" />;
    } else if (flagLevel == 'Green') {
      return <img className="flag-image" src="/assets/images/green_flag.svg" alt="green" />;
    } else {
      return <img className="flag-image" src="/assets/images/yellow_flag.svg" alt="yellow" />;
    }
  };

  render() {
    let { incident, staff } = this.props;
    return (
      <div className="sidebar-container">
        <div className="incident-details">
          <span className="incident-subject"> {incident.subject || 'No subject provided.'} </span>
          <span className="incident-flag">{this.renderFlag(incident.Level.name)}</span>
          <p> {incident.description || 'No description provided.'} </p>
          <p className="incident-extra">
            reported by <b>{incident.User.name}</b> on <b>{this.handleDateString(incident.dateOccurred)}</b>{' '}
          </p>
        </div>

        <hr className="divider" />

        <div className="incident-status">
          <span> Witnesses: </span>
          <ul className="list">
            {incident.witnesses ? (
              incident.witnesses.map((witness, i) => {
                return <li key={i}> {witness} </li>;
              })
            ) : (
              <li> No witnesses </li>
            )}
          </ul>
          <span className="incident-status-title"> Incident status: </span>
          <div>
            <DropDownMenu
              value={incident.statusId || 1}
              onChange={this.handleStatusChange}
              className="dropdown dropdown-status"
            >
              <MenuItem value={1} primaryText="Pending" />
              <MenuItem value={2} primaryText="In Progress" />
              <MenuItem value={3} primaryText="Resolved" />
            </DropDownMenu>
          </div>

          <span> Assigned to: </span>
          <div>
            {incident.assigneeId ? (
              <DropDownMenu
                value={incident.Assignee.id}
                onChange={this.handleChangeAssignee}
                className="dropdown dropdown-assigned"
              >
                {staff.map((staffMember, i) => {
                  return <MenuItem key={i} value={staffMember.id} primaryText={staffMember.name} />;
                })}
              </DropDownMenu>
            ) : (
              <DropDownMenu value={0} onChange={this.handleChangeAssignee} className="dropdown dropdown-assigned">
                <MenuItem value={0} primaryText="Assign someone" />
                {staff ? (
                  staff.map((staffMember, i) => {
                    return <MenuItem key={i} value={staffMember.id} primaryText={staffMember.name} />;
                  })
                ) : (
                  <MenuItem value={0} primaryText={'No assignees available'} />
                )}
              </DropDownMenu>
            )}
          </div>

          <span> Location: </span>
          <ul className="list">
            {incident.Location ? (
              <li> {`${incident.Location.name}, ${incident.Location.centre}, ${incident.Location.country}`} </li>
            ) : (
              <li> No location specified </li>
            )}
          </ul>
        </div>

        <hr className="divider" />
        <span>Activity</span>
        <div className="incident-activity">
          <div className="incident-activity-item">
            <b>Janet Njoroge</b> updated the status to <b>"Pending"</b>
          </div>
          <div className="incident-activity-item">
            <b>Janet Njoroge</b> updated the status to <b>"Pending"</b>
          </div>
          <div className="incident-activity-item">
            <b>Janet Njoroge</b> updated the status to <b>"Pending"</b>
          </div>
          <div className="incident-activity-item">
            <b>Janet Njoroge</b> updated the status to <b>"Pending"</b>
          </div>
          <div className="incident-activity-item">
            <b>Janet Njoroge</b> updated the status to <b>"Pending"</b>
          </div>
          <div className="incident-activity-item">
            <b>Janet Njoroge</b> updated the status to <b>"Pending"</b>
          </div>
          <div className="incident-activity-item">
            <b>Janet Njoroge</b> updated the status to <b>"Pending"</b>
          </div>
          <div className="incident-activity-item">
            <b>Janet Njoroge</b> updated the status to <b>"Pending"</b>
          </div>
        </div>
      </div>
    );
  }
}

TimelineSidebar.propTypes = {
  incident: PropTypes.object.isRequired,
  match: PropTypes.object,
  changeStatus: PropTypes.func.isRequired,
  changeAssignee: PropTypes.func.isRequired,
  staff: PropTypes.array
};
