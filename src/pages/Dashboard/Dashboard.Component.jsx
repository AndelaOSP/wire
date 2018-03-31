import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
      typeFilterKey: 'All Incidents',
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

  changeTypeFilter() {
    return key => {
      this.setState({ typeFilterKey: key });
    };
  }

  filterIncidents() {
    let incidents = this.props.incidents;

    // filter by countries
    if (this.state.filterKey !== 'All Countries') {
      incidents = incidents.filter(incident => {
        return this.state.filterKey.toLocaleLowerCase() === incident.Location.country.toLowerCase();
      });
    }

    // filter country by  incident's Type
    if (this.state.typeFilterKey !== 'All Incidents') {
      incidents = incidents.filter(incident => {
        const stateKey = this.state.typeFilterKey.toLocaleLowerCase();
        return incident.Level && stateKey === incident.Level.name.toLocaleLowerCase();
      });
    }
    return incidents;
  }

  render() {
    const incidents = this.filterIncidents();
    const { isLoading, isError, errorMessage } = this.props;

    return (
      <div>
        <NavBar {...this.props} />
        {isLoading ? (
          <CircularProgressIndicator />
        ) : (
          <div>
            <IncidentFilter
              incident={this.state.selectedIncident}
              changeCountryFilter={this.changeFilter()}
              filterByType={this.changeTypeFilter()}
            />
            <div className="dashboard-container">
              {<IncidentList incidents={incidents} onSelect={this.handleSelectedIncident} />}
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
