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
 return { error: 'Unknown user'};

};

export default decodeToken;
