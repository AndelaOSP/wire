import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import './UserFilter.scss';
import Modal from '../Modal/Modal.Component';
import { white } from 'material-ui/styles/colors';

class UserFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'All Countries',
      open: false
    };
  }
  /**
   * Method to handle menu item selection
   */
  handleChange = (event, index, value) => {
    this.props.changeCountryFilter(value);
    this.setState({ value });
  };
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const styles = {
      selectField: {
        fontSize: '0.75vw',
        backgroundColor: '#ffffff',
        width: '9.7vw',
        height: '5vh',
        marginTop: '0.2rem'
      },
      flatButton: { marginLeft: '2rem', marginTop: '0.4rem', borderRadius: '3px' }
    };
    return (
      <div className="user-filter">
        <div className="heading-admin">
          <p>Available Users</p>
          <div className="underline-admin" />
        </div>
        <div className="filter-search">
          <div className="location-filter">
            <p>Location:</p>
            <SelectField
              underlineStyle={{ display: 'none' }}
              iconStyle={{ fill: '#000000', marginRight: '1vw', textAlign: 'center' }}
              labelStyle={{ textAlign: 'center', marginLeft: '1.85vw' }}
              value={this.state.value}
              onChange={this.handleChange}
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
              <input className="admin-search" type="search" />
            </div>
            <div className="invite-button">
              <FlatButton
                label="Invite"
                labelStyle={{ top: '0.1rem' }}
                onClick={this.handleOpen}
                backgroundColor="#3359df"
                labelStyle={{ color: white }}
                hoverColor="none"
                style={styles.flatButton}
              />
              <Modal open={this.state.open} handleClose={this.handleClose} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserFilter.propTypes = {};

export default UserFilter;
