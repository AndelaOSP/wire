const API_URL = "https://api-staging-wire.andela.com/api"
const ANDELA_API_BASE_URL = "https://api.andela.com"
const BASE_URL = "https://staging-wire.andela.com"

const config = {
  ANDELA_API_BASE_URL,
  BASE_URL,
  API_URL,
  INCIDENTS_URL: `${API_URL}/incidents`,
  USERS_URL: `${API_URL}/users`,
  NOTES_URL: `${API_URL}/notes`,
  SEARCH_INCIDENTS_URL: `${API_URL}/search/incidents/`
};

export default config;
