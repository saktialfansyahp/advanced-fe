import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const AuthService = {
  verifyToken() {
    return axios.get(API_URL + 'verify-token', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('user_token') }
    });
  }
};

export default AuthService;
