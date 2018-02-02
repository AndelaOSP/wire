import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

// styles
import './CustomNotification.scss';

// Set default notification text color
let textStyle = {
  color: 'black'
};

const CustomNotification = ({type, open, message }) => {
  if (type === 'success' ) {
    textStyle = { color: '#50AFA5' };
  } else if (type === 'error') {
    textStyle = { color: 'red' };
  }
  return (
    <Snackbar
      type={type}
      open={open}
      message={message}
      className="snackbar"
      autoHideDuration={3000}
      contentStyle={textStyle}
    />
  );
};

// Props validation
CustomNotification.propTypes = {
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired
};

export default CustomNotification;
