import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';

//styling
import './IncidentList.scss';

/**
 * @class IncidentList
 */
export default class IncidentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      flags: {
        green: '/assets/images/green_flag.svg',
        yellow: '/assets/images/yellow_flag.svg',
        red: '/assets/images/red_flag.svg'
      }
    };
  }

  /**
   * Method to determine if a row is selected
   * @param {number} index - Row index
   * @returns {boolean} 
   */
  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1;
  };

  /**
   * Method to set selected row(s)
   * @param {number} selectedRows - Index of selected Row(s)
   */
  handleRowSelection = (selectedRows) => {
    this.setState({
        selected: selectedRows,
    });
    this.props.onSelect(selectedRows[0]);
  };

  /**
   * Method to get incident flag Icon
   * @param {string} flagType - incident flag type
   * @returns {string} flagType URL
   */
  getIncidentFlag = (flagType) => {
    if (flagType === 'type A') {
      return this.state.flags.green;
    } else if (flagType === 'type B') {
      return this.state.flags.yellow;
    } else {
      return this.state.flags.red;
    }
  }
  
  render() {

    const { incidents } = this.props;

    return (
      <Table onRowSelection={this.handleRowSelection}>
        <TableHeader>
          <TableRow className="table-header">
            <TableHeaderColumn>Avator</TableHeaderColumn>
            <TableHeaderColumn>Reporter</TableHeaderColumn>
            <TableHeaderColumn>Type</TableHeaderColumn>
            <TableHeaderColumn>Description</TableHeaderColumn>
            <TableHeaderColumn>Time</TableHeaderColumn>
            <TableHeaderColumn>Location</TableHeaderColumn>
            <TableHeaderColumn>Witnesses</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody showRowHover>
          {
            incidents.map((incident, index) => (
              <TableRow key={index} selected={this.isSelected(index)}>
                <TableRowColumn>{incident.owner_avatar}</TableRowColumn>
                <TableRowColumn>{incident.slack_handle_reporter}</TableRowColumn>
                <TableRowColumn><img className="incident-flag" src={this.getIncidentFlag(incident.incident_type)} /></TableRowColumn>
                <TableRowColumn><FlatButton label="Show"/></TableRowColumn>
                <TableRowColumn>{incident.date_occurred}</TableRowColumn>
                <TableRowColumn>{incident.location_name}</TableRowColumn>
                <TableRowColumn>@slack.handle</TableRowColumn>
                <TableRowColumn><FlatButton label={incident.status}/></TableRowColumn>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    );
  }
}

/**
 * PropTypes
 */

 IncidentList.propTypes = {
   incidents: PropTypes.array,
   onSelect: PropTypes.func
 };
