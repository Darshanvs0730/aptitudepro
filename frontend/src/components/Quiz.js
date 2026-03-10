import React, { useState, useEffect } from 'react';
import { useNavigate, useBlocker } from 'react-router-dom';
import QuestionService from '../services/QuestionService';
import { useToast } from './Toast';
import './Quiz.css';

const Quiz = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [questionLimit, setQuestionLimit] = useState(10);

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    if (!showScore && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showScore, timeLeft]);

  // Determine if the user is in the middle of taking a quiz
  const isMidQuiz = !loading && !showScore && questions.length > 0;

  // Expose to window for the logout native interceptor
  useEffect(() => {
    window.isMidQuiz = isMidQuiz;
    return () => {
      window.isMidQuiz = false;
    };
  }, [isMidQuiz]);

  // 1. Block soft navigations via React Router
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (isMidQuiz && currentLocation.pathname !== nextLocation.pathname) {
      return true;
    }
    return false;
  });

  // 2. Block hard refreshes / closing the tab
  useEffect(() => {
    if (!isMidQuiz) return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      // Most modern browsers stringify this, boolean true triggers the standard modal
      e.returnValue = true;
      return true;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isMidQuiz]);

  const loadQuestions = () => {
    setLoading(true);
    setError(null);
    QuestionService.getRandomQuestions(questionLimit)
      .then((response) => {
        const shuffledQuestions = response.data.sort(() => Math.random() - 0.5);
        setQuestions(shuffledQuestions);
        setLoading(false);
        setQuestionStartTime(Date.now());
        showToast('Quiz loaded successfully!', 'success');
      })
      .catch((error) => {
        const resMessage =
          error.response?.data?.message ||
          error.message ||
          error.toString();

        if (error.response?.status === 401) {
          localStorage.removeItem('user');
          navigate('/login');
          return;
        }

        setError(resMessage);
        setLoading(false);
        showToast('Failed to load questions. Please try again.', 'error');
      });
  };

  const handleTimeUp = () => {
    showToast('Time is up! Submitting your quiz...', 'warning');
    setTimeout(() => {
      finishQuiz();
    }, 1000);
  };

  const handleAnswerOptionClick = (option) => {
    if (isAnswered) return;

    const isCorrect = option.correct;
    setSelectedOption(option);
    setIsAnswered(true);

    if (isCorrect) {
      setScore(score + 1);
      showToast('Correct answer! 🎉', 'success', 2000);
    } else {
      showToast('Incorrect answer. Check the explanation.', 'error', 2000);
    }

    const attemptData = {
      questionId: questions[currentQuestionIndex].id,
      selectedOptionId: option.id,
      wasCorrect: isCorrect,
    };

    QuestionService.saveAttempt(attemptData).catch((error) => {
      console.error('Error saving attempt:', error);
    });
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setIsAnswered(false);
      setSelectedOption(null);
      setQuestionStartTime(Date.now());
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setShowScore(true);
    const accuracy = ((score / questions.length) * 100).toFixed(1);
    if (accuracy >= 80) {
      showToast('Excellent performance! 🏆', 'success');
    } else if (accuracy >= 60) {
      showToast('Good job! Keep practicing!', 'info');
    } else {
      showToast('Keep practicing to improve! 💪', 'warning');
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowScore(false);
    setIsAnswered(false);
    setSelectedOption(null);
    setTimeLeft(600);
    loadQuestions();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  };

  if (loading) {
    return (
      <div className="quiz-container">
        <div className="quiz-loading">
          <div className="loading-spinner"></div>
          <h3>Loading your quiz...</h3>
          <p>Preparing questions for you</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-container">
        <div className="quiz-error card">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Quiz</h3>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={loadQuestions}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="quiz-container">
        <div className="quiz-error card">
          <div className="error-icon">📝</div>
          <h3>No Questions Available</h3>
          <p>Please check back later or contact support.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      {/* Navigation Blocker Modal */}
      {blocker.state === 'blocked' && (
        <div className="modal-backdrop">
          <div className="modal-content card animate-fade-in">
            <h3 style={{ color: 'var(--error)', marginBottom: '1rem' }}>Warning: Active Quiz!</h3>
            <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              You have an active quiz. If you leave this page, your progress will be completely lost. Are you sure you want to exit?
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button className="btn btn-outline" onClick={() => blocker.reset()}>
                Stay on Quiz
              </button>
              <button className="btn btn-primary" style={{ backgroundColor: 'var(--error)', color: 'white' }} onClick={() => blocker.proceed()}>
                Exit Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {showScore ? (
        <div className="score-section card animate-fade-in">
          <div className="score-icon">
            {score >= questions.length * 0.8 ? '🏆' :
              score >= questions.length * 0.6 ? '🎯' :
                score >= questions.length * 0.4 ? '👍' : '💪'}
          </div>
          <h2 className="score-title">Quiz Completed!</h2>
          <div className="score-stats">
            <div className="stat-item">
              <div className="stat-label">Score</div>
              <div className="stat-value">{score}/{questions.length}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Accuracy</div>
              <div className="stat-value">{((score / questions.length) * 100).toFixed(1)}%</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Time Used</div>
              <div className="stat-value">{formatTime(600 - timeLeft)}</div>
            </div>
          </div>
          <div className="score-actions">
            <button className="btn btn-primary btn-lg" onClick={restartQuiz}>
              Try Again
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => navigate('/dashboard')}>
              View Dashboard
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Quiz Header */}
          <div className="quiz-header card">
            <div className="quiz-progress">
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${getProgress()}%` }}
                ></div>
              </div>
              <div className="progress-text">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>
            <div className="quiz-timer">
              <span className="timer-icon">⏱️</span>
              <span className={`timer-text ${timeLeft < 60 ? 'timer-warning' : ''}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Question Section */}
          <div className="question-section card animate-fade-in">
            <div className="question-category">
              {currentQuestion?.category?.name} • {currentQuestion?.difficulty}
            </div>
            <h2 className="question-text">{currentQuestion?.questionText}</h2>
          </div>

          {/* Answer Section */}
          <div className="answer-section">
            {currentQuestion?.options?.map((option, index) => {
              const isSelected = selectedOption?.id === option.id;
              const isCorrectAnswer = option.correct;
              let optionClass = 'answer-option';

              if (isAnswered) {
                if (isCorrectAnswer) {
                  optionClass += ' correct';
                } else if (isSelected && !isCorrectAnswer) {
                  optionClass += ' incorrect';
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswerOptionClick(option)}
                  className={`${optionClass} card`}
                  disabled={isAnswered}
                >
                  <div className="option-label">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div className="option-text">{option.optionText}</div>
                  {isAnswered && isCorrectAnswer && (
                    <div className="option-check">✓</div>
                  )}
                  {isAnswered && isSelected && !isCorrectAnswer && (
                    <div className="option-cross">✕</div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Section */}
          {isAnswered && (
            <div className="explanation-section card animate-slide-up">
              <div className="explanation-header">
                <span className="explanation-icon">💡</span>
                <strong>Explanation</strong>
              </div>
              <p className="explanation-text">
                {currentQuestion?.explanation?.explanationText}
              </p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="next-button-section">
              <button
                className="btn btn-primary btn-lg"
                onClick={handleNextQuestion}
              >
                {currentQuestionIndex + 1 < questions.length
                  ? 'Next Question →'
                  : 'Finish Quiz'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;
