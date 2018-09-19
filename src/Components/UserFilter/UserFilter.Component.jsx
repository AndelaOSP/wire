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
        fontSize: '12px',
        backgroundColor: '#ffffff',
        width: '9.7vw',
        height: '5vh',
        marginTop: '1vh'
      },
      flatButton: { marginLeft: '1vw', borderRadius: '3px' },
      iconStyle: {
        fill: '#95989a',
        left: '5.7vw'
      },
      labelStyle: {
        backgroundColor: '#e0e0e0',
        height: '30px',
        width: '90px',
        lineHeight: '30px',
        paddingTop: '0',
        paddingRight: '0',
        top: '10px',
        textAlign: 'center',
        verticalAlign: 'none',
        marginLeft: '1vw',
        borderRadius: '20px'
      }
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
              iconStyle={styles.iconStyle}
              labelStyle={styles.labelStyle}
              value={this.state.countryFilter}
              onChange={this.handleCountryChange}
              className="custom-menu"
              style={styles.selectField}
            >
              <MenuItem value="All Countries" primaryText="ALL" />
              <MenuItem value="Kenya" primaryText="KENYA" />
              <MenuItem value="Nigeria" primaryText="NIGERIA" />
              <MenuItem value="UGANDA" primaryText="UGANDA" />
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
