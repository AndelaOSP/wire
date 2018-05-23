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
    const styles = { display: 'block', fontSize: '0.8rem', width: '10rem', padding: '0 auto 0 0' };
    return (
      <div className="custom-menu">
        <SelectField
          underlineStyle={{display: 'none'}}
          iconStyle={{ fill: '#000000', marginRight: '1rem' }}
          labelStyle={{ textAlign: 'right' }}
          value={this.state.value}
          onChange={this.handleChange}
          style={styles}
        >
          <MenuItem value="All Countries" primaryText="All Countries" />
          <MenuItem value="Kenya" primaryText="Kenya" />
          <MenuItem value="Nigeria" primaryText="Nigeria" />
          <MenuItem value="Uganda" primaryText="Uganda" />
          <MenuItem value="USA" primaryText="USA" />
        </SelectField>
      </div>
    );
  }
}

CustomMenu.propTypes = {
  changeCountryFilter: PropTypes.func
};

export default CustomMenu;
