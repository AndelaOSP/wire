import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import moment from 'moment';
import {
  loadIncidentDetails,
  addNote,
  editNote,
  archiveNote,
  changeAssignee,
  handleCC,
  changeStatus,
  sendMessage,
} from '../../actions/timelineAction';
import { fetchStaff } from '../../actions/staffAction';
import './IncidentTimeline.scss';
import { NavBar } from '../../Common/NavBar/NavBar.Component';
import CustomNotification from '../../Components/CustomNotification/CustomNotification.Component';
import TimelineSidebar from '../../Components/TimelineSidebar/TimelineSidebar.Component';
import TimelineNotes from '../../Components/TimelineNotes/TimelineNotes.Component';
import TimelineChat from '../../Components/TimelineChat/TimelineChat.Component';
import CircularProgressIndicator from '../../Components/Progress/Progress.Component';


/**
 * @class IncidentTimeline
 */
export class IncidentTimeline extends Component {
  componentDidMount() {
    this.props.fetchStaff();
    this.props.loadIncidentDetails(this.props.match.params.incidentId);
  }

  handleDateString = (date) => {
    let dateString = moment(date).format('LL');

    const today = moment();
    const yesterday = moment().subtract(1, 'day');

    if (moment(date).isSame(today, 'day')) {
      dateString = 'Today';
    } else if (moment(date).isSame(yesterday, 'day')) {
      dateString = 'Yesterday';
    }

    return dateString;
  };

  handleRedirect() {
    this.setState({ redirect: !this.state.redirect });
  }

  renderFlag = (flagLevel) => {
    if (flagLevel === 'Red') {
      return <img className="flag-image" src="/assets/images/red_flag.svg" alt="red" />;
    } if (flagLevel === 'Green') {
      return <img className="flag-image" src="/assets/images/green_flag.svg" alt="green" />;
    }
    return <img className="flag-image" src="/assets/images/yellow_flag.svg" alt="yellow" />;
  };

  renderUsername=(reporter) => {
    if (Array.isArray(reporter)) {
      return reporter[0].username;
    }
    return reporter.username;
  }

  render() {
    const {
      incident, isLoading, isError, errorMessage, 
    } = this.props;
    
    return (
      <div>
        <NavBar {...this.props} />
        {isLoading ? <CircularProgressIndicator /> : null}
        {isError ? (
          <CustomNotification type="error" message={errorMessage} autoHideDuration={1500000} open />
        ) : (
          <CustomNotification type="error" message={errorMessage} open={false} />
        )}
        {this.props.incident.id ? (
          <div className="timeline-container">
            <TimelineSidebar className="timeline-sidebar" {...this.props} />


            <div className="timeline-main-content">
              <div className="incident-details">
                <span className="incident-subject">
                  {' '}
                  {incident.subject || 'No subject provided.'}
                  {' '}
                </span>
                <span className="incident-flag">{this.renderFlag(incident.Level.name)}</span>
                <div className="underline" />
                <div className="incident-description">
                  <div className="description-details">
                    <p>
                      {' '}
                      {incident.description || 'No description provided.'}
                      {' '}
                    </p>
                    <p className="incident-extra">
                reported by
                      {' '}
                      <b>
                        { this.renderUsername(incident.reporter) }
                      </b>

                      {' '}
on
                      {' '}
                      <b>{this.handleDateString(incident.dateOccurred)}</b>
                      {' '}
                    </p>
                  </div>
                </div>
              </div>
              <Tabs contentContainerClassName="timeline-tabs" inkBarStyle={{ backgroundColor: '#E2E2E2' }} className="">
                <Tab label="Notes" className="notes-tab">
                  <TimelineNotes className="notes-content" {...this.props} />
                </Tab>
                <Tab label="Chat" className="chat-tab">
                  <TimelineChat className="chat-content" {...this.props} />
                </Tab>
              </Tabs>
            </div>
          </div>
        ) : null}
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
  errorMessage: PropTypes.string.isRequired,
};

IncidentTimeline.defaultProps = {
  loadIncidentDetails: () => {},
  incident: {},
  fetchStaff: () => {},
  staff: [],
};

export const mapStateToProps = state => ({
  incident: state.selectedIncident,
  staff: state.staff,
  isLoading: state.isLoading,
  isError: state.error.status,
  errorMessage: state.error.message,
});

export const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loadIncidentDetails,
    addNote,
    editNote,
    archiveNote,
    changeAssignee,
    handleCC,
    changeStatus,
    sendMessage,
    fetchStaff,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(IncidentTimeline);
