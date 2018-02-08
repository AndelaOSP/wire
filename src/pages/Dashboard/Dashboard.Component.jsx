import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

// actions
import { loadIncidents, changeStatus } from '../../actions/incidentAction';
import { addNote } from '../../actions/noteAction';

// styling
import './Dashboard.scss';

// Components
import NavBar from '../../Common/NavBar/NavBar.Component';
import IncidentFilter from '../../Components/IncidentFilter/IncidentFilter.Component';
import IncidentList from '../../Components/IncidentList/IncidentList.Component';
import CustomButton from '../../Components/Button/Button.Component';

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
    this.props.addNote(noteText, incidentId);
    this.props.changeStatus(statusId, incidentId);
    this.setState({ showNotesDialog: !this.state.showNotesDialog });
  };

  render() {
    const incidents = this.filterIncidents();
    const actions = [
      <CustomButton label="Cancel" onClick={this.handleClose} />,
      <CustomButton label="Submit" onClick={this.handleSubmit} />
    ];

    return (
      <div>
        <NavBar {...this.props} />
        <IncidentFilter
          incident={this.state.selectedIncident}
          changeCountryFilter={this.changeFilter()}
          onSelectStatus={this.handleSelectedValue}
        />
        <div className="dashboard-container">
          {<IncidentList incidents={incidents} onSelect={this.handleSelectedIncident} />}
        </div>

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
            fullWidth={true}
            floatingLabelText="Add notes to the incident"
            multiLine={true}
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
  addNote: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired
};

/**
 * map state from the store to props
 * @param {*} state
 * @returns {*} partial state
 */
const mapStateToProps = state => {
  return {
    incidents: state.incidents,
    notes: state.notes
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
      addNote,
      changeStatus
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
