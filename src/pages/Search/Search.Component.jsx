import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

// styling
import './Search.scss';

// actions
import { searchIncidents } from '../../actions/incidentAction';

// Components
import IncidentCard from '../../Components/IncidentList/IncidentCard.Component';

/**
 * @class SearchComponent
 */
class SearchComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.searchInput.focus();
  }

  /**
   * Method to handle search input change
   */
  handleInputChange = () => {
    let searchQuery = this.searchInput.input.value.toLowerCase();
    if (searchQuery) {
      this.props.searchIncidents(searchQuery);
    }
  };

  /**
   * Method to exit search
   * @param {event} event - Event triggering exit to dashboard
   */
  handleExit = event => {
    event.preventDefault();
    this.props.history.push('/dashboard');
  };

  getTime = timestamp => new Date(timestamp).toLocaleTimeString();

  getDate = timestamp =>
    new Date(timestamp).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

  render() {
    const incidents = this.searchInput ? this.props.incidents : [];
    return (
      <div className="search-container">
        <TextField
          ref={input => (this.searchInput = input)}
          floatingLabelText="Search for an incident"
          fullWidth
          rows={2}
          className="input-style"
          onChange={this.handleInputChange}
        />
        <i className="fa fa-times-circle" title="Click to exit search" onClick={this.handleExit} />
        <div className="incident-cards">
          {incidents.length
            ? incidents.map(incident => (
                <IncidentCard
                  key={incident.id}
                  incidentId={incident.id}
                  incidentSubject={incident.subject}
                  incidentDescription={incident.description || 'No Description'}
                  incidentReportDate={`reported on ${this.getDate(incident.dateOccurred)}`}
                  incidentTime={this.getTime(incident.dateOccurred)}
                  incidentFlag={incident.Level.name}
                  assignees={incident.assignees}
                />
              ))
            : null}
        </div>
      </div>
    );
  }
}

/**
 * Search Component Props validation
 */
SearchComponent.propTypes = {
  history: PropTypes.object.isRequired,
  incidents: PropTypes.array.isRequired,
  searchIncidents: PropTypes.func.isRequired,
};

/**
 * map state from the store to props
 * @param {*} state
 * @returns {*} partial state
 */
const mapStateToProps = state => {
  return {
    incidents: state.incidents,
  };
};

/**
 * map dispatch to props
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      searchIncidents,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(SearchComponent);
