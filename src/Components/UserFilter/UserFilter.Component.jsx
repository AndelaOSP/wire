import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import './UserFilter.scss';
import Modal from '../Modal/Modal.Component';

class UserFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryFilter: 'All Countries',
      open: false
    };
  }

  /**
   * Method to handle filtering by country
   */
  handleCountryChange = (event, index, value) => {
    this.props.changeCountryFilter(value);
    this.setState({ countryFilter: value });
  };

  /**
   * Method to handle opening invite modal
   */
  handleOpen = () => {
    this.setState({ open: true });
  };

  /**
   * Method to handle closing invite modal
   */
  handleClose = () => {
    this.setState({ open: false });
  };

  /**
   * Method to handle searching users
   */
  handleInputChange = e => {
    let query = e.target.value;
    this.props.handleSearch(query);
  };

  /**
   * Method to handle the invite user api call
   */
  handleInvite = (email, position, location) => {
    this.props.handleInvite(email, position, location);
  };

  render() {
    const { staff } = this.props;
    const styles = {
      selectField: {
        fontSize: '0.75vw',
        backgroundColor: '#ffffff',
        width: '9.7vw',
        height: '5vh',
        marginTop: '0.2rem'
      },
      flatButton: { marginLeft: '1vw', marginTop: '0.4rem', borderRadius: '3px' }
    };
    return (
      <div className="user-filter">
        <div className="heading-admin">
          <p>Available Users ({staff.length})</p>
          <div className="underline-admin" />
        </div>
        <div className="filter-search">
          <div className="location-filter">
            <p>Location:</p>
            <SelectField
              underlineStyle={{ display: 'none' }}
              iconStyle={{ fill: '#000000', marginRight: '1vw', textAlign: 'center' }}
              labelStyle={{ textAlign: 'center', marginLeft: '1.85vw' }}
              value={this.state.countryFilter}
              onChange={this.handleCountryChange}
              className="custom-menu"
              style={styles.selectField}
            >
              <MenuItem value="All Countries" primaryText="All Countries" />
              <MenuItem value="Kenya" primaryText="Kenya" />
              <MenuItem value="Nigeria" primaryText="Nigeria" />
              <MenuItem value="Uganda" primaryText="Uganda" />
              <MenuItem value="USA" primaryText="USA" />
            </SelectField>
          </div>
          <div className="right-side-search">
            <div className="search-bar">
              <input className="admin-search" type="search" onChange={this.handleInputChange} />
            </div>
            <div className="invite-button">
              <FlatButton
                label="Invite"
                labelStyle={{ verticalAlign: 'none', color: '#fff' }}
                onClick={this.handleOpen}
                backgroundColor="#3359df"
                hoverColor="none"
                style={styles.flatButton}
              />
              <Modal open={this.state.open} handleClose={this.handleClose} handleInvite={this.handleInvite} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserFilter.propTypes = {
  staff: PropTypes.array.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleInvite: PropTypes.func.isRequired,
  changeCountryFilter: PropTypes.func.isRequired
};

export default UserFilter;
