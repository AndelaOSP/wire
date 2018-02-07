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
      value: 1
    };
  }

  /**
   * Method to handle Dropdown Change
   * Should display the form to add a note to a selected incident
   */
  handleChange = (event, index, value) => {
    this.setState({ value });
    this.props.onSelectStatus(value);
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
            value={0}
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
            autoOk={true}
            textFieldStyle={{ fontSize: '0.8rem', textAlign: 'center' }}
          />

          <DatePicker
            className="date-filter"
            hintText="To"
            mode="landscape"
            container="inline"
            autoOk={true}
            textFieldStyle={{ fontSize: '0.8rem', textAlign: 'center' }}
          />

          <SelectField
            value={0}
            className="flag-filter"
            style={{ fontSize: '0.8rem', textAlign: 'center', width: '8rem' }}
          >
            <MenuItem value={0} primaryText="Flag" />
            <MenuItem value={1} primaryText="Red Flag" />
            <MenuItem value={2} primaryText="Yellow Flag" />
            <MenuItem value={3} primaryText="Green Flag" />
          </SelectField>

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

          <CustomMenu className="country-filter" changeCountryFilter={this.props.changeCountryFilter} />
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
