import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

// actions
import { loadIncidents } from '../../actions/incidentAction';

// styling
import './Dashboard.scss';

// Components
import NavBar from '../../Common/NavBar/NavBar.Component';
import CustomNotification from '../../Components/CustomNotification/CustomNotification.Component';
import IncidentFilter from '../../Components/IncidentFilter/IncidentFilter.Component';
import IncidentList from '../../Components/IncidentList/IncidentList.Component';
import CircularProgressIndicator from '../../Components/Progress/Progress.Component';

/**
 * @class Dashboard
 */
export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterKey: 'All Countries',
      flagFilterKey: 'All Incidents',
      typeFilter: 'Pending',
      timeFilter: 'All',
      assignedToMe: false,
      showNotesDialog: false,
      value: 1
    };
  }

  componentDidMount() {
    this.props.loadIncidents();
  }

  changeFilter() {
    return key => {
      this.setState({ filterKey: key });
    };
  }

  changeFlagFilter() {
    return key => {
      this.setState({ flagFilterKey: key });
    };
  }

  changeTypeFilter() {
    return key => {
      this.setState({ typeFilter: key });
    };
  }

  changeTimeFilter() {
    return key => {
      this.setState({ timeFilter: key });
    };
  }

  changeAssignedToMeFilter() {
    return key => {
      this.setState({ assignedToMe: key });
    };
  }

  getDate = timestamp => new Date(timestamp).toDateString();

  getWeek = timestamp => moment(timestamp).format('W');

  getMonth = timestamp => new Date(timestamp).getMonth();

  filterIncidents() {
    let incidents = this.props.incidents;

    // filter by countries
    if (this.state.filterKey !== 'All Countries') {
      incidents = incidents.filter(incident => {
        return this.state.filterKey.toLocaleLowerCase() === incident.Location.country.toLowerCase();
      });
    }

    // filter by incident's flag
    if (this.state.flagFilterKey !== 'All Incidents') {
      incidents = incidents.filter(incident => {
        const stateKey = this.state.flagFilterKey.toLocaleLowerCase();
        return incident.Level && stateKey === incident.Level.name.toLocaleLowerCase();
      });
    }

    // filter by incident's type
    if (this.state.typeFilter !== 'All Incidents') {
      incidents = incidents.filter(incident => {
        const typeKey = this.state.typeFilter;
        return incident.Status && typeKey === incident.Status.status;
      });
    }

    // filter by assignedToMe
    if (this.state.assignedToMe) {
      let extractAssigness = incident => {
        let emails = [];
        incident.assignees.forEach(assignee => {
          emails.push(assignee.email);
        });
        return emails;
      };

      incidents = incidents.filter(incident => {
        const me = localStorage.getItem('email');
        return extractAssigness(incident).indexOf(me) !== -1;
      });
    }

    // filter by time
    switch (this.state.timeFilter) {
      case 'Day':
        incidents = incidents.filter(incident => {
          let day = this.getDate(new Date());
          return this.getDate(incident.dateOccurred) == day;
        });
        break;
      case 'Week':
        incidents = incidents.filter(incident => {
          let week = moment().format('W');
          return this.getWeek(incident.dateOccurred) == week;
        });
        break;
      case 'Month':
        incidents = incidents.filter(incident => {
          let month = this.getMonth(new Date());
          return this.getMonth(incident.dateOccurred) == month;
        });
        break;
      default:
        return incidents;
    }
    return incidents;
  }

  render() {
    const incidents = this.filterIncidents();
    const { isLoading, isError, errorMessage } = this.props;

    return (
      <div>
        <NavBar {...this.props} showSearch />
        {isLoading ? (
          <CircularProgressIndicator />
        ) : (
          <div>
            <IncidentFilter
              incident={this.state.selectedIncident}
              changeCountryFilter={this.changeFilter()}
              filterByFlag={this.changeFlagFilter()}
              filterByType={this.changeTypeFilter()}
              changeTime={this.changeTimeFilter()}
              changeMineAll={this.changeAssignedToMeFilter()}
            />
            <div className="dashboard-container">
              {<IncidentList incidents={incidents} incidentsType={this.state.typeFilter} />}
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
Dashboard.propTypes = {
  incidents: PropTypes.array.isRequired,
  loadIncidents: PropTypes.func.isRequired,
  location: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired
};

/**
 * map state from the store to props
 * @param {*} state
 * @returns {*} partial state
 */
const mapStateToProps = state => {
  return {
    incidents: state.incidents,
    isLoading: state.isLoading,
    isError: state.error.status,
    errorMessage: state.error.message
  };
};

/**
 * map dispatch to props
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadIncidents
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
