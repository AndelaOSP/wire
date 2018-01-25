import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  customWidth: {
    width: 145,
  },
};

/**
 * @class CustomMenu
 */
export class CustomMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 'All Countries',
    };
  }

  /**
   * Method to handle menu item selection
   */
  handleChange = (event, index, value) => this.props.changeCountryFilter(value);

  render() {
    return (
      <div>
        <SelectField
          value={this.state.value}
          onChange={this.handleChange}
          style={styles.customWidth}
        >
          <MenuItem value="All Countries" primaryText="All Countries" />
          <MenuItem value="Nairobi, Kenya" primaryText="Kenya" />
          <MenuItem value="Lagos, Nigeria" primaryText="Nigeria" />
          <MenuItem value="Kampala, Uganda" primaryText="Uganda" />
          <MenuItem value="New York, USA" primaryText="USA" />
        </SelectField>
      </div>
    );
  }
}

CustomMenu.propTypes = {
  changeCountryFilter: PropTypes.func,
};

export default CustomMenu;
