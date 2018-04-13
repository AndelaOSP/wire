import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import moment from 'moment';

// styling
import './TimelineSidebar.scss';

export default class TimelineSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      selectedValues: []
    };
  }

  /**
   * This lifecycle hook is used to populate the list of ccd associates
   */
  componentWillReceiveProps(nextProps) {
    let ccdAssociates = nextProps.incident.assignees
      .filter(user => {
        return user.assignedRole === 'ccd';
      })
      .map(user => {
        return user.id;
      });
    if (this.state.selectedValues !== ccdAssociates) {
      this.setState({ selectedValues: ccdAssociates });
    }
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
    this.props.changeAssignee({ userId: value, incidentId: this.props.incident.id });
  };

  handleSelectCCd = (event, index, values) => {
    this.setState({ selectedValues: values });
  };

  renderCC = staff => {
    return staff.map(staffMember => {
      return (
        <MenuItem
          key={staffMember.id}
          insetChildren
          value={staffMember.id}
          checked={this.state.selectedValues && this.state.selectedValues.indexOf(staffMember.id) > -1}
          primaryText={staffMember.username}
        />
      );
    });
  };

  onSelectClose = () => {
    let ccdUsers = this.state.selectedValues.map(selected => {
      return { incidentId: this.props.incident.id, userId: selected };
    });
    this.props.handleCC({ incidentId: this.props.incident.id, ccdUsers });
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
    let assignee = incident.assignees.find(user => {
      return user.assignedRole === 'assignee';
    });
    let ccdAssociates = incident.assignees.filter(user => {
      return user.assignedRole === 'ccd';
    });
    return (
      <div className="sidebar-container">
        <div className="incident-details">
          <span className="incident-subject"> {incident.subject || 'No subject provided.'} </span>
          <span className="incident-flag">{this.renderFlag(incident.Level.name)}</span>
          <p> {incident.description || 'No description provided.'} </p>
          <p className="incident-extra">
            reported by <b>{incident.reporter.username}</b> on <b>{this.handleDateString(incident.dateOccurred)}</b>{' '}
          </p>
        </div>

        <hr className="divider" />

        <div className="incident-status">
          <span> Witnesses: </span>
          <ul className="list">
            {incident.witnesses ? (
              incident.witnesses.map((witness, i) => {
                return <li key={i}> {witness.username} </li>;
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
            {assignee ? (
              <DropDownMenu
                value={assignee.id}
                onChange={this.handleChangeAssignee}
                className="dropdown dropdown-assigned"
              >
                {staff.map((staffMember, i) => {
                  return <MenuItem key={i} value={staffMember.id} primaryText={staffMember.username} />;
                })}
              </DropDownMenu>
            ) : (
              <DropDownMenu value={0} onChange={this.handleChangeAssignee} className="dropdown dropdown-assigned">
                <MenuItem value={0} primaryText="Assign someone" />
                {staff ? (
                  staff.map((staffMember, i) => {
                    return <MenuItem key={i} value={staffMember.id} primaryText={staffMember.username} />;
                  })
                ) : (
                  <MenuItem value={0} primaryText={'No assignees available'} />
                )}
              </DropDownMenu>
            )}
          </div>

          <span> CC: </span>
          <div>
            <SelectField
              multiple
              hintText="Select a name"
              value={this.state.selectedValues}
              onChange={this.handleSelectCCd}
              dropDownMenuProps={{
                onClose: this.onSelectClose
              }}
            >
              {this.renderCC(staff, ccdAssociates)}
            </SelectField>
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
      </div>
    );
  }
}

TimelineSidebar.propTypes = {
  incident: PropTypes.object.isRequired,
  match: PropTypes.object,
  changeStatus: PropTypes.func.isRequired,
  changeAssignee: PropTypes.func.isRequired,
  handleCC: PropTypes.func.isRequired,
  staff: PropTypes.array
};
