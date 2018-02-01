import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';

// styling
import './IncidentTimeline.scss';

// Components
import NavBar from '../../Common/NavBar/NavBar.Component';
import TimelineSidebar from '../../Components/TimelineSidebar/TimelineSidebar.Component';
import TimelineNotes from '../../Components/TimelineNotes/TimelineNotes.Component';
import TimelineChat from '../../Components/TimelineChat/TimelineChat.Component';

/**
 * @class IncidentTimeline
 */
export class IncidentTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <NavBar {...this.props} />

        <div className="timeline-container">
          <TimelineSidebar className="timeline-sidebar" />

          <div className="timeline-main-content">
            <Tabs contentContainerClassName="timeline-tabs" inkBarStyle={{ backgroundColor: '#E2E2E2' }}>
              <Tab label="Chat" className="chat-tab">
                <TimelineChat className="chat-content" />
              </Tab>
              <Tab label="Notes" className="notes-tab">
                <TimelineNotes className="notes-content" />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * IncidentTimeline Component Props validation
 */
IncidentTimeline.propTypes = {
  addNote: PropTypes.func
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
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(IncidentTimeline);
