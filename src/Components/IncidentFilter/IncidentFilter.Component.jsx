import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

// styling
import './IncidentFilter.scss';

// Components
import CustomMenu from '../CustomMenu/CustomMenu.Component';

/**
 * @class IncidentFilter
 */
class IncidentFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flagFilterValue: 'All Incidents',
      incidentsType: 'Pending',
      assignedToMe: false,
    };
  }

  /**
   * Method to handle change on flag filter drop down
   */
  handleFlagChange = (event, index, value) => {
    this.props.filterByFlag(value);
    this.setState({ flagFilterValue: value });
  };

  /**
   * Method to handle change on type filter drop down
   */
  handleTypeChange = (event, index, value) => {
    this.props.filterByType(value);
    this.setState({ incidentsType: value });
  };

  /**
   * Method to handle change on time filter buttons
   */
  handleTimeChange = (value) => {
    this.props.changeTime(value);
  };

  handleMineAllChange = () => {
    this.props.changeMineAll(!this.state.assignedToMe);
    this.setState({ assignedToMe: !this.state.assignedToMe });
  };

  render() {
    const styles = {
      thumbOff: {
        backgroundColor: '#616161',
      },
      trackOff: {
        backgroundColor: '#BCBCBC',
      },
      thumbSwitched: {
        backgroundColor: '#127dc5',
      },
      trackSwitched: {
        backgroundColor: '#81D4FA',
      },
      selectField: {
        fontSize: '0.75vw', backgroundColor: '#ffffff', width: '9.7vw', height: '5vh',
      },
    };
    return (
      <div className="filters-container">
        <div className="toggle-section">
          <span className={`${this.state.assignedToMe ? 'toggle-label toggle-label--active' : 'toggle-label'}`}>Mine</span>
          <Switch
            color="default"
            onChange={() => this.handleMineAllChange()}
            checked={!this.state.assignedToMe}
          />
          <span className={`${!this.state.assignedToMe ? 'toggle-label toggle-label--active' : 'toggle-label'}`}>All incidents</span>
        </div>
        <div className="filters">
          <span className="incidents-label">Incidents</span>

          <CustomMenu changeCountryFilter={this.props.changeCountryFilter} />

          <SelectField
            underlineStyle={{ display: 'none' }}
            iconStyle={{ fill: '#000000', marginRight: '1vw', textAlign: 'center' }}
            labelStyle={{ textAlign: 'center', marginLeft: '1.85vw' }}
            value={this.state.flagFilterValue}
            onChange={this.handleFlagChange}
            className="flag-filter"
            style={styles.selectField}
          >
            <MenuItem value="All Incidents" primaryText="All Flags" />
            <MenuItem value="red" primaryText="Red Flag" />
            <MenuItem value="yellow" primaryText="Yellow Flag" />
            <MenuItem value="green" primaryText="Green Flag" />
          </SelectField>

          <SelectField
            underlineStyle={{ display: 'none' }}
            iconStyle={{ fill: '#000000', marginRight: '1vw', textAlign: 'center' }}
            labelStyle={{ textAlign: 'center', marginLeft: '1.85vw' }}
            value={this.state.incidentsType}
            onChange={this.handleTypeChange}
            className="incidents-filter"
            style={styles.selectField}
          >
            <MenuItem value="Pending" primaryText="Pending" />
            <MenuItem value="In Progress" primaryText="In Progress" />
            <MenuItem value="Resolved" primaryText="Resolved" />
            <MenuItem value="All Incidents" primaryText="All Incidents" />
          </SelectField>

          <div className="duration-filter">
            <button className="duration-button" onClick={() => this.handleTimeChange('Day')}>
              <span>Day</span>
            </button>
            <button className="duration-button" onClick={() => this.handleTimeChange('Week')}>
              <span>Week</span>
            </button>
            <button className="duration-button" onClick={() => this.handleTimeChange('Month')}>
              <span>Month</span>
            </button>
            <button className="duration-button" onClick={() => this.handleTimeChange('All')}>
              <span>All</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

IncidentFilter.propTypes = {
  changeCountryFilter: PropTypes.func,
  filterByFlag: PropTypes.func,
  filterByType: PropTypes.func,
  changeTime: PropTypes.func,
  changeMineAll: PropTypes.func,
};

IncidentFilter.defaultProps = {
  changeCountryFilter: () => {},
  filterByFlag: () => {},
  filterByType: () => {},
  changeTime: () => {},
  changeMineAll: () => {},
};

export default IncidentFilter;
