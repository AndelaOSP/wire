import jwtDecode from 'jwt-decode';

/**
 * A function that decodes and returns user info
 * @returns {object}
 */
const decodeToken = () => {
  const rawToken = document.cookie.split('jwt-token=');

  if (rawToken.length === 2) {
    const userInfo = jwtDecode(rawToken[1]).UserInfo;
    return userInfo;
  }
  return { error: 'Unknown user' };
};

const currentUser = () => {
  const token = localStorage.getItem('token');
  try {
    const userInfo = jwtDecode(token);
    return userInfo;
  } catch (InvalidTokenError) {
    return false;
  }
};

export { decodeToken, currentUser };
