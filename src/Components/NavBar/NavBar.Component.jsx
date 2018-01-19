import React, { Component } from 'react';
import Badge from 'material-ui/Badge';
import PropTypes from 'prop-types';

// styles
import './NavBar.scss';

// helpers
import authenticateUser from '../../helpers/auth';

/**
 * @class NavBar
 */
export default class NavBar extends Component {
  constructor(props){
    super(props);
  }

  /**
   * Method to handle Sign out
   * @param {event} event - Event triggering signing out
   */
  handleSignOut = (event) => {
    event.preventDefault();
    authenticateUser.logoutUser();
  }

  /**
   * Method to redirect to search
   * @param {event} event - Event triggering search
   */
  handleSearch = (event) => {
    event.preventDefault();
    this.props.history.push('/search');
  }

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="left-nav-section">
          <img className="logo" src="/assets/images/wire_logo_v1.svg" alt="Wire"/>
          <input className="search-input" onFocus={this.handleSearch} type="text" placeholder="&#xF002; Search for an incident" />
        </div>
        <div className="right-nav-section">
          <div className="notifications">
            <i className="fa fa-bell-o fa-2x notification-icon" aria-hidden="true" />
            <Badge badgeContent={4} className="badge"/>
          </div>
          <div className="profile">
              <div className="dropdowntn">
                <span className="user-name">{localStorage.getItem('user')}</span>
                <img className="profile-img" src={localStorage.getItem('user_avatar')} alt="Wire"/>
                <i className="fa fa-caret-down" aria-hidden="true" />
              </div>
              <div className="dropdown-content" onClick={this.handleSignOut}>
                 <span>Logout</span>
              </div>
          </div>
        </div>  
      </nav>
    );
  }
}

/**
 * Navbar Component Props validation
 */
NavBar.propTypes = {
  history: PropTypes.object.isRequired,
};
