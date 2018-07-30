import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// actions
import { fetchStaff, searchUsers } from '../../actions/staffAction';

// styling
import './AdminDashboard.scss';

// Components
import NavBar from '../../Common/NavBar/NavBar.Component';
import AvailableUser from '../../Components/AvailableUser/AvailableUser.Component';
import UserFilter from '../../Components/UserFilter/UserFilter.Component';
import CustomNotification from '../../Components/CustomNotification/CustomNotification.Component';
import CircularProgressIndicator from '../../Components/Progress/Progress.Component';

/**
 * @class Dashboard
 */
export class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryFilter: 'All Countries'
    };
  }

  componentDidMount() {
    this.props.fetchStaff();
  }

  changeCountryFilter() {
    return key => {
      this.setState({ countryFilter: key });
    };
  }

  handleSearch = query => {
    if (query) {
      this.props.searchUsers(query);
    }
  }

  filterStaff = () => {
    let staff = this.props.staff;

    // filter by countries
    if (this.state.countryFilter !== 'All Countries') {
      staff = staff.filter(user => {
        return this.state.countryFilter.toLocaleLowerCase() === user.Location.country.toLowerCase();
      });
    }

    return staff;
  }

  render() {
    const { isLoading, isError, errorMessage } = this.props;
    const staff = this.filterStaff();
    return (
      <div>
        <NavBar {...this.props} showSearch={false} />
        {isLoading ? (
          <CircularProgressIndicator />
        ) : (
          <div className="admin-dashboard">
            <UserFilter
              staff={staff}
              handleSearch={this.handleSearch}
              changeCountryFilter={this.changeCountryFilter()}
            />
            <div className="available-users">
              {staff.length
                ? staff.map(staffMember => (
                    <AvailableUser
                      key={staffMember.id}
                      imageUrl={staffMember.imageUrl}
                      username={staffMember.username}
                      role={staffMember.Role.name.toUpperCase()}
                      country={staffMember.Location.country}
                    />
                  ))
                :
                <div className="no-users">
                  <p>Sorry, no users. Invite some?</p>
                </div>}
            </div>
          </div>
        )}
        {isError ? (
          <CustomNotification type={'error'} message={errorMessage} autoHideDuration={15000} open />
        ) : (
          <CustomNotification type={'error'} message={errorMessage} open={false} />
        )}
      </div>
    );
  }
}

/**
 * Dashboard Component Props validation
 */
AdminDashboard.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  fetchStaff: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  staff: PropTypes.array
};

/**
 * map state from the store to props
 * @param {*} state
 * @returns {*} partial state
 */
const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
    isError: state.error.status,
    errorMessage: state.error.message,
    staff: state.staff
  };
};

/**
 * map dispatch to props
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchStaff, searchUsers,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
