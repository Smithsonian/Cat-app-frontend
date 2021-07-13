import axios from 'axios';

const setAuthToken = token =>
  token
    ? (axios.defaults.headers.common['token'] = token)
    : delete axios.defaults.headers.common['token'];

export default setAuthToken;
