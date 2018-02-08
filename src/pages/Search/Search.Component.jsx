import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

// styling
import './Search.scss';

/**
 * @class SearchComponent
 */
class SearchComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.nameInput.focus();
  }

  /**
   * Method to exit search
   * @param {event} event - Event triggering exit to dashboard
   */
  handleExit = event => {
    event.preventDefault();
    this.props.history.push('/dashboard');
  };

  render() {
    return (
      <div className="search-container">
        <TextField
          ref={input => {
            this.nameInput = input;
          }}
          floatingLabelText="Search for an incident"
          fullWidth
          rows={2}
          className="input-style"
        />
        <i className="fa fa-times-circle" title="Click to exit search" onClick={this.handleExit} />
      </div>
    );
  }
}

/**
 * Search Component Props validation
 */
SearchComponent.propTypes = {
  history: PropTypes.object.isRequired
};

export default SearchComponent;
