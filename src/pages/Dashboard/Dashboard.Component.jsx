import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// actions
import { loadIncidents } from '../../actions/incidentAction';

// styling
import './Dashboard.scss';

// Components
import NavBar from '../../Components/NavBar/NavBar.Component';
import IncidentFilter from '../../Components/IncidentFilter/IncidentFilter.Component';
import IncidentList from '../../Components/IncidentList/IncidentList.Component';
import CircularProgressIndicator from '../../Components/Progress/Progress.Component';

/**
 * @class Dashboard
 */
class Dashboard extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.loadIncidents();
  }

  render() {

    const { incidents } = this.props;
    
    return (
      <div>
        <NavBar />
        <div className="dashboard-container">
          <IncidentFilter />
          {
            incidents.length ? <IncidentList incidents={incidents}/> : <CircularProgressIndicator />
          }
        </div>
      </div>
    );
  }
}

/**
 * Dashboard Component Props validation
 */
Dashboard.propTypes = {
  incidents: PropTypes.array.isRequired,
  loadIncidents: PropTypes.func.isRequired
};

/**
 * map state from the store to props
 * @param {*} state 
 * @returns {*} partial state
 */
const mapStateToProps = state => {
  return {
    incidents: state.incidents
  };
};

/**
 * map dispatch to props
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  loadIncidents,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);