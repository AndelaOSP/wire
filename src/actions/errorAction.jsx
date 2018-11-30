import { ERROR_ACTION } from './actionTypes';

const getErrorMessage = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
}

export const errorAction = (error) => {
  if (error.response) {
    let message;

    switch (error.response.status) {
      case 401 || 403:
        message = getErrorMessage(error) || 'You might not be logged in/authorized. Please try again.';
        break;
      case 404:
        message = getErrorMessage(error) || 'The requested resource cannot be found';
        break;
      case 400:
        message = getErrorMessage(error) || 'The requested resource cannot be found';
        break;
      default:
        message = getErrorMessage(error) || 'Oops! Something went wrong. Please try again.';
    }

    return {
      type: ERROR_ACTION,
      status: true,
      statusCode: error.response.status,
      message: `${message}`,
    };
  }
};
