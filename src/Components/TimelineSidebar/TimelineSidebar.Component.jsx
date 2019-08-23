import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import moment from 'moment';

// styling
import './TimelineSidebar.scss';

// components
import { FormControl, Input } from '@material-ui/core';
import CustomButton from '../Button/Button.Component';

class TimelineSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignee: null,
      selectedValues: [],
      reportDialogOpen: false,
      resolveValue: 0,
      reportText: '',
    };
  }

  /**
   * This lifecycle hook is used to update the list of ccd associates
   * on initial render
   */
  componentDidMount() {
    this.updateAssignee(this.props);
    this.updateCcdAssociates(this.props);
  }

  /**
   * This lifecycle hook is used to update the list of ccd associates
   * after incident assignees array changes
   */
  componentWillReceiveProps(nextProps) {
    this.updateAssignee(nextProps);
    this.updateCcdAssociates(nextProps);
  }

  updateAssignee = (props) => {
    const assignee = props.incident.assignees.find((user) => {
      if (user.assigneeIncidents) {
        return user.assigneeIncidents.assignedRole === 'assignee';
      }
      return user.assignedRole === 'assignee';
    });
    if (this.state.assignee !== assignee) {
      this.setState({ assignee });
    }
  };

  updateCcdAssociates = (props) => {
    const ccdAssociates = props.incident.assignees
      .filter((user) => {
        if (user.assigneeIncidents) {
          return user.assigneeIncidents.assignedRole === 'ccd';
        }
        return user.assignedRole === 'ccd';
      })
      .map(user => user.id);
    if (this.state.selectedValues !== ccdAssociates) {
      this.setState({ selectedValues: ccdAssociates });
    }
  };

  handleDateString = date => moment(date).format('MMM Do YYYY [at] h:mm a');

  /**
   * Method to handle status change for an incident
   * @param {event}
   * 
   * @returns {void}
   */
  handleStatusChange = (event) => {
    event.preventDefault();
    const { target: { value } } = event;
    if (value === 3) {
      this.setState({ reportDialogOpen: !this.state.reportDialogOpen, resolveValue: value });
    } else {
      this.props.changeStatus(value, this.props.incident.id);
    }
  };

  handleReportTextChange = (event) => {
    event.preventDefault();
    this.setState({
      reportText: event.target.value,
    });
  }

  /**
   * Method to handle the resolution of an incident
   * The report is added as a note to the incident
   */
  handleResolveIncident = (e) => {
    e.preventDefault();
    this.props.changeStatus(this.state.resolveValue, this.props.incident.id);
    this.props.addNote(
      `Report: ${this.state.reportText}`,
      this.props.incident.id,
      localStorage.getItem('userId'),
    );
    this.setState({ reportDialogOpen: !this.state.reportDialogOpen, resolveValue: 0 });
  };

  handleCloseReportDialog = (e) => {
    e.preventDefault();
    this.setState({ reportDialogOpen: !this.state.reportDialogOpen, resolveValue: 0 });
  };

  handleChangeAssignee = (event) => {
    const { value } = event.target;
    event.preventDefault();
    this.setState({ assignee: this.props.staff.find(user => user.id === value) });
    this.props.changeAssignee({ 
      userId: value,
      incidentId: this.props.incident.id, 
    });
  };

  /**
   * method handles selected user to cc
   * updates the selectedValues in the state
   * makes a call to update the backend
   * @param event
   * 
   * @return {void}
   */
  handleSelectCCd = (event) => {
    const { value } = event.target;
    this.setState({
      selectedValues: value,
    });
    this.onSelectClose(value);
  };

  generateInitials = (witness) => {
    const names = witness.split(' ');
    const firstInitial = names[0][0].toUpperCase();
    const secondInitial = names[1][0].toUpperCase();
    return firstInitial + secondInitial;
  };

  /**
   * method renders users in the dropdown menu of the select component
   * @param staff
   * 
   * @return {MenuItem}
   */
  renderCC = staff => staff.map(staffMember => (
    <MenuItem
        key={staffMember.id}
        value={staffMember.id}
    >
      {staffMember.username}
    </MenuItem>
  ));

  /**
   * method renders avatar of cc'd user
   * 
   * @return {<img/>}
   */
  renderCCdImage = () => {
    const { incident } = this.props;

    const ccdAssociates = incident.assignees.filter(
      user => user.assignedRole || user.assigneeIncidents.assignedRole,
    );
    return ccdAssociates.map(imageUrl => (
      <img className="ccd-avatar" src={imageUrl.imageUrl} alt="Avatar" />
    ));
  };

  onSelectClose = (values) => {
    const ccdUsers = values.map(
      selected => ({ incidentId: this.props.incident.id, userId: selected }),
    );
    this.props.handleCC({ incidentId: this.props.incident.id, ccdUsers });
  };

  render() {
    const { incident, staff } = this.props;
    const { assignee, selectedValues } = this.state;
    const ccdAssociates = incident.assignees.filter(user => user.assignedRole === 'ccd');
    const resolveActions = [
      <CustomButton key={1} label="Cancel" onClick={this.handleCloseReportDialog} />,
      <CustomButton key={2} label="Submit" onClick={this.handleResolveIncident} />,
    ];
    return (
      <div className="sidebar-container">
        <div className="incident-status">
          <span> Witnesses: </span>
          <div className="list">
            {incident.witnesses ? (
              incident.witnesses.map((witness, i) => (
                <div key={i} className="witness-image">
                  {' '}
                  <p>{this.generateInitials(witness.username)}</p>
                  <div>
                    <span className="tooltip-text">{witness.username}</span>
                  </div>
                </div>
              ))
            ) : (
              <p> No witnesses </p>
            )}
          </div>
          <span className="incident-status-title"> Incident status: </span>
          <div>
            <Select
              value={incident.statusId || 1}
              onChange={this.handleStatusChange}
              className="dropdown dropdown-status"
            >
              <MenuItem value={1}>Pending</MenuItem>
              <MenuItem value={2}>In Progress</MenuItem>
              <MenuItem value={3}>Resolved</MenuItem>
            </Select>
          </div>

          <span> Assigned to: </span>
          <div>
            {assignee ? (
              <Select
              value={assignee.id}
              onChange={this.handleChangeAssignee}
              className="dropdown dropdown-assigned"
              >
                {staff.map((staffMember, i) => (
                  <MenuItem
                  key={i} value={staffMember.id}>
                    {staffMember.username}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <Select
              value="Unassigned"
              onChange={this.handleChangeAssignee}
              className="dropdown dropdown-assigned"
              >
                {staff ? (
                  staff.map((staffMember, i) => (
                    <MenuItem
                      key={i} value={staffMember.id}>
                      {staffMember.username}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value={0}>No assignees available</MenuItem>
                )}
              </Select>
            )}
          </div>

          <span> CC: </span>
          <div>
            <FormControl className="ccd-dropdown">
              <Select
                multiple
                value={selectedValues}
                onChange={this.handleSelectCCd}
                input={<Input id="select-multiple" />}
              >
                {this.renderCC(staff, ccdAssociates)}
              </Select>
            </FormControl>
          </div>
          <div>
            {this.renderCCdImage()}
          </div>
          <span> Location: </span>
          <div className="location-list">
            {incident.Location ? (
              <p>
                {' '}
                {`${incident.Location.name}, ${incident.Location.centre}, ${incident.Location.country}`}
                {' '}
              </p>
            ) : (
              <p> No location specified </p>
            )}
          </div>
        </div>

        <Dialog
          title="Resolve an incident"
          actions={resolveActions}
          modal={false}
          open={this.state.reportDialogOpen}
          onRequestClose={this.handleCloseReportDialog}
        >
          Add the report to the incident or attach a link to the document containing the report
          <TextField
            fullWidth
            multiLine
            rows={3}
            value={this.state.reportText}
            onChange={this.handleReportTextChange}
          />
        </Dialog>
      </div>
    );
  }
}

TimelineSidebar.propTypes = {
  incident: PropTypes.object.isRequired,
  changeStatus: PropTypes.func.isRequired,
  changeAssignee: PropTypes.func.isRequired,
  handleCC: PropTypes.func.isRequired,
  staff: PropTypes.array,
  addNote: PropTypes.func,
};

TimelineSidebar.defaultProps = {
  staff: {},
  addNote: () => {},
};

export default TimelineSidebar;
