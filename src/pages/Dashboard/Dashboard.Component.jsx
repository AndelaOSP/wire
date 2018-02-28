import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

// actions
import { loadIncidents, changeStatus } from '../../actions/incidentAction';

// styling
import './Dashboard.scss';

// Components
import NavBar from '../../Common/NavBar/NavBar.Component';
import IncidentFilter from '../../Components/IncidentFilter/IncidentFilter.Component';
import IncidentList from '../../Components/IncidentList/IncidentList.Component';
import CustomButton from '../../Components/Button/Button.Component';
import CircularProgressIndicator from '../../Components/Progress/Progress.Component';
import CustomNotification from '../../Components/CustomNotification/CustomNotification.Component';

/**
 * @class Dashboard
 */
export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterKey: 'All Countries',
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

  filterIncidents() {
    if (this.state.filterKey === 'All Countries') {
      return this.props.incidents;
    }
    return this.props.incidents.filter(incident => {
      return this.state.filterKey === incident.location_name;
    });
  }
  handleSelectedIncident = selectedIncidentIndex => {
    let selectedIncident = this.props.incidents[selectedIncidentIndex];
    this.setState({ ...selectedIncident });
  };

  handleSelectedValue = value => {
    if (!this.state.id) {
      alert('Please select an incident first!');
    } else {
      this.setState({ value: value });
      this.setState({ showNotesDialog: !this.state.showNotesDialog });
    }
  };

  handleClose = () => {
    this.setState({ showNotesDialog: !this.state.showNotesDialog });
  };
  /**
   * Get the notes from the text field
   * Get the updated status of the incident
   * Send it to the API end point
   */
  handleSubmit = () => {
    let noteText = this.refs.notesTextField.getValue();
    let incidentId = this.state.id;
    let statusId = this.state.value - 1;
    this.props.changeStatus(statusId, incidentId);
    this.setState({ showNotesDialog: !this.state.showNotesDialog });
  };

  render() {
    const incidents = this.filterIncidents();
    const actions = [
      <CustomButton key={1} label="Cancel" onClick={this.handleClose} />,
      <CustomButton key={2} label="Submit" onClick={this.handleSubmit} />
    ];
    const isLoading = this.props.isLoading;
    const isError = this.props.isError;
    const error = this.props.errorMessage;

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
              onSelectStatus={this.handleSelectedValue}
            />
            <div className="dashboard-container">
              {<IncidentList incidents={incidents} onSelect={this.handleSelectedIncident} />}
            </div>
          </div>
        )}
        {isError ? (
          <CustomNotification type={'error'} message={error} autoHideDuration={15000} open />
        ) : (
          <CustomNotification type={'error'} message={error} open={false} />
        )}

        <Dialog
          title={'Subject: ' + this.state.subject || null}
          actions={actions}
          modal={false}
          open={this.state.showNotesDialog}
          onRequestClose={this.handleDialog}
          actionsContainerClassName="dialogActions"
          titleClassName="dialog-title"
        >
          <TextField
            hintText="Add notes"
            fullWidth
            floatingLabelText="Add notes to the incident"
            multiLine
            rows={3}
            ref="notesTextField"
          />
        </Dialog>
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
  changeStatus: PropTypes.func.isRequired,
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
      loadIncidents,
      changeStatus
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
