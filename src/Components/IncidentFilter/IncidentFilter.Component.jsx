import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

//styling
import './IncidentFilter.scss';

//Components
import CustomMenu from '../CustomMenu/CustomMenu.Component';

/**
 * @class IncidentFilter
 */
export default class IncidentFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      durationFilterValue: 0,
      flagFilterValue: 'All Incidents',
      incidentsType: 'Pending'
    };
  }
  /**
   * Method to handle change on flag filter drop down
   */
  handleFlagChange = (event, index, value) => {
    this.props.filterByType(value);
    this.setState({ flagFilterValue: value });
  };

  handleTimeChange = (value) => {
    this.props.changeTime(value);
  }

  render() {
    const styles = {
      thumbOff: {
        backgroundColor: '#616161'
      },
      trackOff: {
        backgroundColor: '#BCBCBC'
      },
      thumbSwitched: {
        backgroundColor: '#127dc5'
      },
      trackSwitched: {
        backgroundColor: '#81D4FA'
      },
      selectField: { fontSize: '0.8rem', textAlign: 'center', width: '10rem', backgroundColor: '#ffffff'}
    };
    return (
      <div className="filters-container">
        <div className="toggle-section">
          <span className="toggle-label">Mine</span>
            <Toggle
              thumbStyle={styles.thumbOff}
              trackStyle={styles.trackOff}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
            />
          <span className="toggle-label">All</span>
        </div>
        <div className="filters">
          <span className="incidents-label">Incidents</span>

          <CustomMenu className="country-filter" changeCountryFilter={this.props.changeCountryFilter} />

          <SelectField
            underlineStyle={{display: 'none'}}
            iconStyle={{ fill: '#000000', marginRight: '2rem' }}
            labelStyle={{ marginLeft: '2rem' }}
            value={this.state.flagFilterValue}
            onChange={this.handleFlagChange}
            className="flag-filter"
            style={styles.selectField}
          >
            <MenuItem value={'All Incidents'} primaryText="All Flags" />
            <MenuItem value={'red'} primaryText="Red Flag" />
            <MenuItem value={'yellow'} primaryText="Yellow Flag" />
            <MenuItem value={'green'} primaryText="Green Flag" />
          </SelectField>

          <SelectField
            underlineStyle={{display: 'none'}}
            iconStyle={{ fill: '#000000', marginRight: '2rem' }}
            labelStyle={{ marginLeft: '2rem' }}
            value={this.state.incidentsType}
            className="incidents-filter"
            style={styles.selectField}
          >
            <MenuItem value={'Pending'} primaryText="Pending" />
            <MenuItem value={'yellow'} primaryText="In Progress" />
            <MenuItem value={'red'} primaryText="Resolved" />
            <MenuItem value={'green'} primaryText="All Incidents" />
          </SelectField>

          <div className="duration-filter">
            <button className="day" onClick={() => this.handleTimeChange('Day')}><span>Day</span></button>
            <button className="week" onClick={() => this.handleTimeChange('Week')}><span>Week</span></button>
            <button className="month" onClick={() => this.handleTimeChange('Month')}><span>Month</span></button>
          </div>

        </div>
      </div>
    );
  }
}

IncidentFilter.propTypes = {
  changeCountryFilter: PropTypes.func,
  filterByType: PropTypes.func,
  changeTime: PropTypes.func,
  incident: PropTypes.object,
  onSelectStatus: PropTypes.func
};
