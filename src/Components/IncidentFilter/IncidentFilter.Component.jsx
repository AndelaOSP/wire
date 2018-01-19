import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

//styling
import './IncidentFilter.scss';

//Components
import CustomButton from '../Button/Button.Component';
import CustomMenu from '../CustomMenu/CustomMenu.Component';

/**
 * @class IncidentFilter
 */
export default class IncidentFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    };
  }

  /**
   * Method to handle Dropdown Change
   * Should display the form to add a note to a selected incident
   */
  handleChange = (event, index, value) => {
    this.setState({value});
    this.props.onSelectStatus(value);
  };


  render() {
    return (
      <div className="filters-container">
        <div className="filters">
          <span className="incidents-label">Show Incidents</span>
          <CustomButton label="This Week" />
          <CustomButton label="This Month" />
          <DatePicker
            className="date-filter"
            hintText="From"
            container="inline"
          />
          <DatePicker
            className="date-filter"
            hintText="To"
            container="inline"
          />
          <span className="flag-type-label">
            Filter
          </span>
          <CustomButton label="All Incidents" />
          <CustomButton label="Red flag" />
          <CustomButton label="Yellow flag" />
          <CustomButton label="Green flag" />
          <CustomMenu changeCountryFilter={this.props.changeCountryFilter} />
        </div>
        <div className="incident-select">
          <div className="left-section">
            <span>All Incidents &nbsp; </span>
            <span>reported in the last 7 days (October 9, 2017 October 16, 2017)</span>
          </div>
          <div className="right-section">
            <DropDownMenu
              value={this.state.value}
              onChange={this.handleChange}
            >
              <MenuItem value={1} primaryText="Mark As" />
              <MenuItem value={2} primaryText="Pending" />
              <MenuItem value={3} primaryText="In Progress" />
              <MenuItem value={4} primaryText="Resolved" />
            </DropDownMenu>
            <CustomButton label="Reply" />
            <CustomButton label="Add Notes" />
          </div>
        </div>
      </div>
    );
  }
}

IncidentFilter.propTypes = {
  changeCountryFilter: PropTypes.func,
  incident: PropTypes.object,
  onSelectStatus: PropTypes.func
};
