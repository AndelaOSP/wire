import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import './Button.scss';

const CustomButton = ({ label, onClick }) => (
  <FlatButton
  className="button_"
  label={label}
  onClick={onClick} />
);
CustomButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

CustomButton.defaultProps = {
  onClick: () => {},
};

export default CustomButton;
