import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

/**
 * @class CustomMenu
 */
export class CustomMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 'All Countries'
    };
  }

  /**
   * Method to handle menu item selection
   */
  handleChange = (event, index, value) => {
    this.props.changeCountryFilter(value);
    this.setState({ value });
  };

  render() {
    const styles = { fontSize: '0.75vw', backgroundColor: '#ffffff', width: '9.5vw', height: '5vh' };
    return (
      <SelectField
        underlineStyle={{ display: 'none' }}
        iconStyle={{ fill: '#000000', marginRight: '1rem', textAlign: 'center' }}
        labelStyle={{ textAlign: 'center', marginLeft: '1.85rem' }}
        value={this.state.value}
        onChange={this.handleChange}
        className="custom-menu"
        style={styles}
      >
        <MenuItem value="All Countries" primaryText="All Countries" />
        <MenuItem value="Kenya" primaryText="Kenya" />
        <MenuItem value="Nigeria" primaryText="Nigeria" />
        <MenuItem value="Uganda" primaryText="Uganda" />
        <MenuItem value="USA" primaryText="USA" />
      </SelectField>
    );
  }
}

CustomMenu.propTypes = {
  changeCountryFilter: PropTypes.func
};

export default CustomMenu;
