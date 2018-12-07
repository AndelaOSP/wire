const { API_URL, ANDELA_API_BASE_URL, BASE_URL } = process.env;

const config = {
  ANDELA_API_BASE_URL,
  BASE_URL,
  API_URL,
  INCIDENTS_URL: `${API_URL}/incidents`,
  USERS_URL: `${API_URL}/users`,
  NOTES_URL: `${API_URL}/notes`,
  SEARCH_INCIDENTS_URL: `${API_URL}/search/incidents/`,
};

export default config;
