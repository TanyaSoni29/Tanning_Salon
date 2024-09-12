/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for MDInput
import MDInputRoot from "components/MDInput/MDInputRoot";

const MDInput = forwardRef(({ error, success, disabled, onFocus, ...rest }, ref) => (
  <MDInputRoot {...rest} ref={ref} onFocus={onFocus} ownerState={{ error, success, disabled }} />
));

// Setting default values for the props of MDInput
MDInput.defaultProps = {
  error: false,
  success: false,
  disabled: false,
  onFocus: null,
};

// Typechecking props for the MDInput
MDInput.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
};

export default MDInput;
