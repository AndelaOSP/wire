// action types
import { ERROR_ACTION } from './actionTypes';

/**
 * The function returns a message in form of a string
 * 
 * @param {Object} error
 * 
 * @returns {string}
 */
const getErrorMessage = (error)=> {
  if(error.response && error.response.data && error.response.data.message) return error.response.data.message;
};

/**
 * Action creator for captured errors
 * 
 * @param {Object} error
 * 
 * @returns {Object}
 */
export const errorAction = error => {
  if (error.response) {
    let message;

    switch (error.response.status) {
      case 401 || 403:
        message = getErrorMessage(error) || 'You might not be logged in/authorized. Please try again.';
        break;
      case 404:
        message =  getErrorMessage(error) || 'The requested resource cannot be found';
        break;
      case 400:
        message =  getErrorMessage(error) || 'The requested resource cannot be found';
        break;
      default:
        message =  getErrorMessage(error) || 'Oops! Something went wrong. Please try again.';
    }

    return {
      type: ERROR_ACTION,
      status: true,
      statusCode: error.response.status,
      message: `${message}`
    };
  }
};
