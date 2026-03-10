import axios from 'axios';
import AuthService from './AuthService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/';

class QuestionService {
  getQuestions() {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
      return axios.get(API_URL + 'questions', {
        headers: {
          Authorization: 'Bearer ' + user.token
        }
      });
    }
  }

  getRandomQuestions(limit = 10) {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
      return axios.get(API_URL + 'questions/random', {
        params: { limit },
        headers: {
          Authorization: 'Bearer ' + user.token
        }
      });
    }
  }

  saveAttempt(attemptData) {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
      return axios.post(API_URL + 'attempts', attemptData, {
        headers: {
          Authorization: 'Bearer ' + user.token
        }
      });
    }
  }

  getAttempts() {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
      return axios.get(API_URL + 'attempts', {
        headers: {
          Authorization: 'Bearer ' + user.token
        }
      });
    }
  }

  addQuestion(questionData) {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
      return axios.post(API_URL + 'questions', questionData, {
        headers: {
          Authorization: 'Bearer ' + user.token
        }
      });
    }
  }

  deleteQuestion(questionId) {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
      return axios.delete(API_URL + `questions/${questionId}`, {
        headers: {
          Authorization: 'Bearer ' + user.token
        }
      });
    }
  }
}

export default new QuestionService();

