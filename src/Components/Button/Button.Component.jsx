import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

// styles
import './Button.scss';

const CustomButton = ({ label, onClick }) => <FlatButton className="button_" label={label} onClick={onClick} />;

// props validation
CustomButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default CustomButton;
