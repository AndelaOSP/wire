import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// styling
import '../CustomMenu/CustomMenu.scss';
import './IncidentFilter.scss';

// Components
import CustomMenu from '../CustomMenu/CustomMenu.Component';
import { currentUser } from '../../helpers/decodeToken';

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
  handleFlagChange = (event) => {
    const { value } = event.target;
    this.props.filterByFlag(value);
    this.setState({ flagFilterValue: value });
  };

  /**
   * Method to handle change on type filter drop down
   */
  handleTypeChange = (event) => {
    const { value } = event.target;
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
    const userInfo = currentUser();
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
      select: {
        fontSize: '0.75vw',
        color: '#000',
        backgroundColor: '#ffffff',
        width: '9.7vw',
        height: '5vh',
        textAlign: 'center',
      },
    };
    return (
      <div className="filters-container">
        <div className="toggle-section">
          {userInfo.roleId === 3 ? (
            <div>
              <span className={`${this.state.assignedToMe ? 'toggle-label toggle-label--active' : 'toggle-label'}`}>Mine</span>
              <Switch
                color="default"
                onChange={() => this.handleMineAllChange()}
                checked={!this.state.assignedToMe}
              />
              <span className={`${!this.state.assignedToMe ? 'toggle-label toggle-label--active' : 'toggle-label'}`}>All incidents</span>
            </div>
          ) : ''}
        </div>
        <div className="filters">
          <span className="incidents-label">Incidents</span>

          <CustomMenu changeCountryFilter={this.props.changeCountryFilter} />

          <Select
            value={this.state.flagFilterValue}
            onChange={this.handleFlagChange}
            className="custom-menu"
            style={styles.select}
            >
            <MenuItem value="All Incidents">All Flags</MenuItem>
            <MenuItem value="red">Red Flag</MenuItem>
            <MenuItem value="yellow">Yellow Flag</MenuItem>
            <MenuItem value="green">Green Flag</MenuItem>
          </Select>

          <Select
            value={this.state.incidentsType}
            onChange={this.handleTypeChange}
            className="custom-menu"
            style={styles.select}
            >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Resolved">Resolved</MenuItem>
            <MenuItem value="All Incidents">All Incidents</MenuItem>
          </Select>
          
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
