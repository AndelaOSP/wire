import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// actions
import { fetchStaff } from '../../actions/staffAction';

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
  }

  componentDidMount() {
    this.props.fetchStaff();
  }

  render() {
    const { isLoading, isError, errorMessage, staff } = this.props;

    return (
      <div>
        <NavBar {...this.props} showSearch={false} />
        {isLoading ? (
          <CircularProgressIndicator />
        ) : (
          <div className="admin-dashboard">
            <UserFilter />
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
                : null}
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
      fetchStaff
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
