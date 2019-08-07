import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import './UserFilter.scss';
import Modal from '../Modal/Modal.Component';

class UserFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryFilter: 'All Countries',
      open: false,
    };
  }

  handleCountryChange = (event) => {
    this.props.changeCountryFilter(event.target.value);
    this.setState({ countryFilter: event.target.value });
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
  handleInputChange = (e) => {
    const query = e.target.value;
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
        color: '#000',
        backgroundColor: '#ffffff',
        width: '9.7vw',
        height: '5vh',
        textAlign: 'center',
      },
      flatButton: {
        marginLeft: '1.5rem',
        borderRadius: '3px',
        minWidth: '12rem',
        backgroundColor: '#3359df',
        color: '#ffffff',
      },
      iconStyle: {
        fill: '#95989a',
        left: '5.7vw',
      },
    };
    return (
      <div className="user-filter">
        <div className="heading-admin">
          <p>
Available Users (
            {staff.length}
)
          </p>
          <div className="underline-admin" />
        </div>
        <div className="filter-search">
          <div className="location-filter">
            <p>Location:</p>
            <Select
              value={this.state.countryFilter}
              onChange={this.handleCountryChange}
              className="custom-menu"
              style={styles.selectField}
            >
              <MenuItem value="All Countries">ALL</MenuItem>
              <MenuItem value="Kenya"> KENYA </MenuItem>
              <MenuItem value="Nigeria"> NIGERIA </MenuItem>
              <MenuItem value="UGANDA"> UGANDA </MenuItem>
              <MenuItem value="USA"> USA </MenuItem>
            </Select>
          </div>
          <div className="right-side-search">
            <div className="search-bar">
              <input className="admin-search" type="search" onChange={this.handleInputChange} />
            </div>
            <div className="invite-button">
              <Button
                onClick={this.handleOpen}
                style={styles.flatButton}
              >
              Invite
              </Button>
              <Modal
                open={this.state.open}
                handleClose={this.handleClose}
                handleInvite={this.handleInvite} />
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
  changeCountryFilter: PropTypes.func.isRequired,
};

export default UserFilter;
