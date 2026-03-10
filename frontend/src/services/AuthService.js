import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/';
const API_URL = `${BASE_URL}auth/`;

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + 'signin', {
        username,
        password,
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(username, email, password) {
    return axios.post(API_URL + 'signup', {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  forgotPassword(email) {
    return axios.post(API_URL + "forgot-password", { email });
  }

  resetPassword(token, password) {
    return axios.post(API_URL + "reset-password", { token, password });
  }
}

export default new AuthService();