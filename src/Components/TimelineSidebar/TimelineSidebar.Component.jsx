import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import moment from 'moment';

// styling
import './TimelineSidebar.scss';

// components
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
   */
  handleStatusChange = (e, index, value) => {
    e.preventDefault();
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

  handleChangeAssignee = (event, index, value) => {
    event.preventDefault();
    this.setState({ assignee: this.props.staff.find(user => user.id === event.target.value) });
    this.props.changeAssignee({ userId: value, incidentId: this.props.incident.id });
  };

  handleSelectCCd = (event, index, values) => {
    this.setState({ selectedValues: values });
  };

  generateInitials = (witness) => {
    const names = witness.split(' ');
    const firstInitial = names[0][0].toUpperCase();
    const secondInitial = names[1][0].toUpperCase();
    return firstInitial + secondInitial;
  };

  renderCC = staff => staff.map(staffMember => (
    <MenuItem
        key={staffMember.id}
        insetChildren
        value={staffMember.id}
        checked={
          this.state.selectedValues && this.state.selectedValues
            .indexOf(staffMember.id) > -1}
        primaryText={staffMember.username}
      />
  ));

  onSelectClose = () => {
    const ccdUsers = this.state.selectedValues.map(
      selected => ({ incidentId: this.props.incident.id, userId: selected }),
    );
    this.props.handleCC({ incidentId: this.props.incident.id, ccdUsers });
  };

  renderFlag = (flagLevel) => {
    if (flagLevel === 'Red') {
      return <img className="flag-image" src="/assets/images/red_flag.svg" alt="red" />;
    } if (flagLevel === 'Green') {
      return <img className="flag-image" src="/assets/images/green_flag.svg" alt="green" />;
    }
    return <img className="flag-image" src="/assets/images/yellow_flag.svg" alt="yellow" />;
  };

  render() {
    const { styles } = {
      width: '',
      marginLeft: '0',
      fontSize: '30px',
    };
    const { incident, staff } = this.props;
    const { assignee } = this.state;
    const ccdAssociates = incident.assignees.filter(user => user.assignedRole === 'ccd');
    const resolveActions = [
      <CustomButton key={1} label="Cancel" onClick={this.handleCloseReportDialog} />,
      <CustomButton key={2} label="Submit" onClick={this.handleResolveIncident} />,
    ];
    return (
      <div className="sidebar-container">
        <div className="incident-details">
          <span className="incident-subject">
            {' '}
            {incident.subject || 'No subject provided.'}
            {' '}
          </span>
          <span className="incident-flag">{this.renderFlag(incident.Level.name)}</span>
          <div className="underline" />
          <div className="incident-description">
            <div className="description-details">
              <p>
                {' '}
                {incident.description || 'No description provided.'}
                {' '}
              </p>
              <p className="incident-extra">
                reported by
                {' '}
                <b>{incident.reporter.username}</b>
                {' '}
on
                {' '}
                <b>{this.handleDateString(incident.dateOccurred)}</b>
                {' '}
              </p>
            </div>
          </div>
        </div>

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
            <SelectField
              multiple
              hintText="Select a name"
              value={this.state.selectedValues}
              onChange={this.handleSelectCCd}
              styles={styles}
              dropDownMenuProps={{
                onClose: this.onSelectClose,
              }}
            >
              {this.renderCC(staff, ccdAssociates)}
            </SelectField>
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
            // ref="reportTextField"
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
