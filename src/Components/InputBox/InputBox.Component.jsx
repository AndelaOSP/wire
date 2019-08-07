import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import './InputBox.scss';

class InputBox extends Component {
  render() {
    const { 
      onSubmit, 
      value, 
      onChange, 
      hintText, 
      ref,
    } = this.props;
  
    return ( 
      <div className="message-container">
        <img src="/assets/images/clip.svg" color="red" className="attachment-icon" />
        <div className="message-input">
          <form onSubmit={onSubmit}>
            <TextField
              value={value}
              onChange={onChange}
              hintText={hintText}
              ref={ref}
              underlineShow={false}
              className="text-input"
            />
          </form>
        </div>
        <div className="message-icon">
          <img src="/assets/images/smile.svg" className="message-icon" />
        </div>
        <div className="at-icon">@</div>
        <button className="add-button" onClick={onSubmit}>ADD</button>
      </div>
    );
  }
}

InputBox.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  hintText: PropTypes.string.isRequired,
  ref: PropTypes.string,
};

InputBox.defaultProps = {
  ref: 'inputBox',
};

export default InputBox;
