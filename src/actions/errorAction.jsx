import { ERROR_ACTION } from './actionTypes';

// Incidents Error Action Creator
export const errorAction = error => {
  let message;
  switch (error.response.status) {
    case 401:
      message = 'You might not be logged in/authorized. Please try again.';
      break;
    case 404:
      message = 'The requested resource cannot be found';
      break;
    default:
      message = 'Oops! Something went wrong. Please try again.';
  }
  return {
    type: ERROR_ACTION,
    status: true,
    message: `${message}`
  };
};
