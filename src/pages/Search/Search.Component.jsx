import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import './Search.scss';
import { searchIncidents } from '../../actions/incidentAction';
import IncidentCard from '../../Components/IncidentList/IncidentCard.Component';

const styles = {
  input: {
    boxSizing: 'border-box !important',
    fontSize: '3rem !important',
    fontWeight: '200 !important',
    marginTop: '0.7rem !important',
    marginBottom: '0.7rem',
    color: '#929292 !important',
    cursor: 'text !important',
  },
  focused: {
    borderBottom: '1px solid #127dc5 !important',
  },
};

export class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
    };
  }

  handleInputChange = (event) => {
    this.setState(
      {
        searchQuery: event.target.value,
      },
    );
    this.props.searchIncidents(event.target.value);
  }

  /**
   * Method to exit search
   * @param {event} event - Event triggering exit to dashboard
   */
  handleExit = (event) => {
    event.preventDefault();
    this.props.history.push('/dashboard');
  };

  getTime = timestamp => new Date(timestamp).toLocaleTimeString();

  getDate = timestamp => new Date(timestamp).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  render() {
    const { searchQuery } = this.state;
    const { incidents, classes } = this.props;
    return (
      <div className="search-container">
        <TextField
          label="Search for an incident"
          name="title"
          value={searchQuery}
          autoFocus
          fullWidth
          rows={2}
          onChange={this.handleInputChange}
          InputProps={{
            classes: {
              root: classes.input,
              focused: classes.focused,
            },
          }}
          
        />
        <i className="fa fa-times-circle" title="Click to exit search" onClick={this.handleExit} />
        <div className="incident-cards">
          {incidents
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
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  incidents: PropTypes.array.isRequired,
  searchIncidents: PropTypes.func.isRequired,
};

/**
 * map state from the store to props
 * @param {*} state
 * @returns {*} partial state
 */
export const mapStateToProps = state => ({
  incidents: state.incidents,
});

/**
 * map dispatch to props
 * @param {*} dispatch
 */
export const mapDispatchToProps = dispatch => bindActionCreators(
  {
    searchIncidents,
  },
  dispatch,
);

export default withStyles(styles)(connect(
  mapStateToProps, mapDispatchToProps, null, { withRef: true },
)(SearchComponent));
