import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

// styles
import './Button.scss';

const CustomButton = ({label}) => (
    <FlatButton className="button_" label={label} />
);

// props validation
CustomButton.propTypes = {
    label: PropTypes.string.isRequired,
};
  
export default CustomButton;
