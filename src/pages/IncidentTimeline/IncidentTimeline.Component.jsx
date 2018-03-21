import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';

// actions
import {
  loadIncidentDetails,
  addNote,
  editNote,
  archiveNote,
  changeAssignee,
  handleCC,
  changeStatus,
  sendMessage
} from '../../actions/timelineAction';
import { fetchStaff } from '../../actions/staffAction';

// styling
import './IncidentTimeline.scss';

// Components
import NavBar from '../../Common/NavBar/NavBar.Component';
import CustomNotification from '../../Components/CustomNotification/CustomNotification.Component';
import TimelineSidebar from '../../Components/TimelineSidebar/TimelineSidebar.Component';
import TimelineNotes from '../../Components/TimelineNotes/TimelineNotes.Component';
import TimelineChat from '../../Components/TimelineChat/TimelineChat.Component';
import CircularProgressIndicator from '../../Components/Progress/Progress.Component';

/**
 * @class IncidentTimeline
 */
export class IncidentTimeline extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadIncidentDetails(this.props.match.params.incidentId);
    this.props.fetchStaff();
  }

  handleRedirect() {
    this.setState({ redirect: !this.state.redirect });
  }

  render() {
    const { isLoading, isError, errorMessage } = this.props;

    return (
      <div>
        <NavBar {...this.props} />
        {!isLoading && this.props.incident.id ? (
          <div className="timeline-container">
            <TimelineSidebar className="timeline-sidebar" {...this.props} />

            <div className="timeline-main-content">
              <Tabs contentContainerClassName="timeline-tabs" inkBarStyle={{ backgroundColor: '#E2E2E2' }} className="">
                <Tab label="Chat" className="chat-tab">
                  <TimelineChat className="chat-content" {...this.props} />
                </Tab>
                <Tab label="Notes" className="notes-tab">
                  <TimelineNotes className="notes-content" {...this.props} />
                </Tab>
              </Tabs>
            </div>
          </div>
        ) : (
          <CircularProgressIndicator />
        )}

        {isError ? (
          <CustomNotification type={'error'} message={errorMessage} autoHideDuration={15000} open />
        ) : (
          <CustomNotification type={'error'} message={''} open={false} />
        )}
      </div>
    );
  }
}

/**
 * IncidentTimeline Component Props validation
 */
IncidentTimeline.propTypes = {
  loadIncidentDetails: PropTypes.func,
  match: PropTypes.object.isRequired,
  incident: PropTypes.object,
  fetchStaff: PropTypes.func,
  staff: PropTypes.array,
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
    incident: state.selectedIncident,
    staff: state.staff,
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
      loadIncidentDetails,
      addNote,
      editNote,
      archiveNote,
      changeAssignee,
      handleCC,
      changeStatus,
      sendMessage,
      fetchStaff
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(IncidentTimeline);
