import React from 'react';
import PropTypes from 'prop-types';
import { AlertCircle } from 'lucide-react';
import '../App';

function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="error-message">
      <AlertCircle className="error-icon" size={24} />
      <p>{message}</p>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;