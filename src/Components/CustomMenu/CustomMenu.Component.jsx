import React from 'react';
import PropTypes from 'prop-types';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// styles
import './CustomMenu.scss';

/**
 * @class CustomMenu
 */
class CustomMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 'All Countries',
    };
  }

  /**
   * Method to handle menu item selection
   */
  handleChange = (event) => {
    const { value } = event.target;
    this.props.changeCountryFilter(value);
    this.setState({ value });
  };
  

  render() {
    const styles = {
      fontSize: '0.75vw',
      color: '#000',
      backgroundColor: '#ffffff',
      width: '9.7vw',
      height: '5vh',
      textAlign: 'center',

    };

    return (
      <Select
      value={this.state.value}
      onChange={this.handleChange}
      className="custom-menu"
      style={styles}
    >
        <MenuItem value="All Countries">All Countries</MenuItem>
        <MenuItem value="Kenya">Kenya</MenuItem>
        <MenuItem value="Nigeria">Nigeria</MenuItem>
        <MenuItem value="Uganda">Uganda</MenuItem>
        <MenuItem value="USA">USA</MenuItem>
      </Select>

    ); 
  }
}

CustomMenu.propTypes = {
  changeCountryFilter: PropTypes.func,
};

CustomMenu.defaultProps = {
  changeCountryFilter: () => {},
};

export default CustomMenu;