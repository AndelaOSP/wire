import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
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
      flagFilterValue: 'All Incidents'
    };
  }
  /**
   * Method to handle change on flag filter drop down
   */
  handleFlagChange = (event, index, value) => {
    this.props.filterByType(value);
    this.setState({ flagFilterValue: value });
  };

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
      }
    };
    return (
      <div className="filters-container">
        <div className="filters">
          <span className="incidents-label">Show Incidents</span>

          <SelectField
            value={this.state.durationFilterValue}
            className="duration-filter"
            style={{ fontSize: '0.8rem', textAlign: 'center', width: '9rem' }}
          >
            <MenuItem value={0} primaryText="This Week" />
            <MenuItem value={1} primaryText="This Month" />
            <MenuItem value={2} primaryText="This Quarter" />
          </SelectField>

          <span> or </span>

          <DatePicker
            className="date-filter"
            hintText="From"
            mode="landscape"
            container="inline"
            autoOk
            textFieldStyle={{ fontSize: '0.8rem', textAlign: 'center' }}
          />

          <DatePicker
            className="date-filter"
            hintText="To"
            mode="landscape"
            container="inline"
            autoOk
            textFieldStyle={{ fontSize: '0.8rem', textAlign: 'center' }}
          />

          <SelectField
            value={this.state.flagFilterValue}
            onChange={this.handleFlagChange}
            className="flag-filter"
            style={{ fontSize: '0.8rem', textAlign: 'center', width: '8rem' }}
          >
            <MenuItem value={'All Incidents'} primaryText="All flags" />
            <MenuItem value={'red'} primaryText="Red Flag" />
            <MenuItem value={'yellow'} primaryText="Yellow Flag" />
            <MenuItem value={'green'} primaryText="Green Flag" />
          </SelectField>

          <CustomMenu className="country-filter" changeCountryFilter={this.props.changeCountryFilter} />

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
        </div>
      </div>
    );
  }
}

IncidentFilter.propTypes = {
  changeCountryFilter: PropTypes.func,
  filterByType: PropTypes.func,
  incident: PropTypes.object,
  onSelectStatus: PropTypes.func
};
