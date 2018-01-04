import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

// styles
import './Progress.scss';

const CircularProgressIndicator= () => (
  <div className="progress-container">
    <CircularProgress size={50} thickness={5} color="#127dc5" />
  </div>
);

export default CircularProgressIndicator;
