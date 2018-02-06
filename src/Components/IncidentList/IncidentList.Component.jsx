import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';

import IncidentSection from './IncidentSection.Component';

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
    return (
      <div className="all-incidents">
        <div className="incidents incidents-pending">
          <IncidentSection
            incidentStatus={'PENDING'}
            incidents={[]} // replace with pending data from api
          />
        </div>
        <div className="incidents incidents-progress">
          <IncidentSection
            incidentStatus={'IN PROGRESS'}
            incidents={[]} // replace with pending data from api
          />
        </div>
        <div className="incidents incidents-resolved">
          <IncidentSection
            incidentStatus={'RESOLVED'}
            incidents={[]} // replace with pending data from api
          />
        </div>
      </div>
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
