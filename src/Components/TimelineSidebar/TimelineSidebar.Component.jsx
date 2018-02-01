import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

// styling
import './TimelineSidebar.scss';

export default class TimelineSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="sidebar-container">
        <div className="incident-details">
          <span className="incident-subject">Phone stolen at my desk</span>
          <p className="incident-extra">reported by Muchai, 2 hours ago</p>
        </div>

        <hr className="divider" />

        <div className="incident-status">
          <span className="incident-status-title">Incident status</span>
          <div>
            <DropDownMenu value={1} className="dropdown dropdown-status">
              <MenuItem value={1} primaryText="Pending" />
              <MenuItem value={2} primaryText="In Progress" />
              <MenuItem value={3} primaryText="Resolved" />
            </DropDownMenu>
          </div>

          <span>Assigned to</span>
          <div>
            <DropDownMenu value={1} className="dropdown dropdown-assigned">
              <MenuItem value={1} primaryText="Maureen Nyakio" />
              <MenuItem value={2} primaryText="Janet Njoroge" />
            </DropDownMenu>
          </div>
        </div>

        <hr className="divider" />

        <div className="incident-activity">
          <span>Activity</span>
          <div className="incident-activity-item">Janet Njoroge updated the status to pending</div>
          <div className="incident-activity-item">Janet Njoroge updated the status to pending</div>
          <div className="incident-activity-item">Janet Njoroge updated the status to pending</div>
        </div>
      </div>
    );
  }
}
