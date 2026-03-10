import React, { useState, useEffect } from 'react';
import QuestionService from '../services/QuestionService';
import { useToast } from './Toast';
import './AdminBoard.css';

const AdminBoard = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    questionText: '',
    categoryId: 1,
    difficulty: 'EASY',
    explanationText: '',
    options: [
      { optionText: '', isCorrect: true },
      { optionText: '', isCorrect: false },
      { optionText: '', isCorrect: false },
      { optionText: '', isCorrect: false },
    ]
  });
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    setLoading(true);
    QuestionService.getQuestions()
      .then(response => {
        setQuestions(response.data);
        setLoading(false);
      })
      .catch(error => {
        const errorMsg = error.response?.data?.message ||
          "You do not have permission to view this page.";
        setError(errorMsg);
        setLoading(false);
        showToast(errorMsg, 'error');
      });
  };

  const triggerDelete = (id) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmId) {
      QuestionService.deleteQuestion(deleteConfirmId)
        .then(() => {
          showToast('Question deleted successfully!', 'success');
          fetchQuestions();
          setDeleteConfirmId(null);
        })
        .catch(err => {
          showToast('Error deleting question.', 'error');
          setDeleteConfirmId(null);
        });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmId(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion(prevState => ({ ...prevState, [name]: value }));
  };

  const handleOptionChange = (index, e) => {
    const { name, value, type } = e.target;
    const updatedOptions = [...newQuestion.options];
    if (type === 'radio') {
      updatedOptions.forEach((opt, i) => opt.isCorrect = i === index);
    } else {
      updatedOptions[index][name] = value;
    }
    setNewQuestion(prevState => ({ ...prevState, options: updatedOptions }));
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.options.some(opt => opt.isCorrect)) {
      showToast('Please select one correct answer.', 'error');
      return;
    }
    QuestionService.addQuestion(newQuestion)
      .then(() => {
        showToast('Question added successfully!', 'success');
        setShowAddForm(false);
        setNewQuestion({
          questionText: '',
          categoryId: 1,
          difficulty: 'EASY',
          explanationText: '',
          options: [
            { optionText: '', isCorrect: true },
            { optionText: '', isCorrect: false },
            { optionText: '', isCorrect: false },
            { optionText: '', isCorrect: false },
          ]
        });
        fetchQuestions();
      })
      .catch(err => {
        const errorMsg = err.response?.data?.message || "Failed to add question.";
        showToast(errorMsg, 'error');
      });
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="admin-loading">
          <div className="loading-spinner"></div>
          <h3>Loading question data...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-container">
        <div className="admin-error card">
          <div className="error-icon">⚠️</div>
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Question Management</h1>
          <p className="admin-subtitle">Manage and organize your quiz questions</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : '+ Add New Question'}
        </button>
      </div>

      {deleteConfirmId && (
        <div className="modal-overlay">
          <div className="modal-card animate-fade-in">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this question? This action cannot be undone and will delete all user attempt history for it.</p>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={cancelDelete}>Cancel</button>
              <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {showAddForm && (
        <div className="add-question-card card animate-fade-in">
          <div className="card-header">
            <h3>Add New Question</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleAddQuestion}>
              <div className="input-group">
                <label className="form-label">Question Text</label>
                <textarea
                  name="questionText"
                  className="form-control"
                  onChange={handleFormChange}
                  required
                  rows="4"
                  placeholder="Enter your question here..."
                  value={newQuestion.questionText}
                />
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label className="form-label">Category</label>
                  <select
                    name="categoryId"
                    className="form-select"
                    onChange={handleFormChange}
                    required
                    value={newQuestion.categoryId}
                  >
                    <option value="1">Quantitative Aptitude</option>
                    <option value="2">Logical Reasoning</option>
                    <option value="3">Verbal Ability</option>
                  </select>
                </div>

                <div className="input-group">
                  <label className="form-label">Difficulty</label>
                  <select
                    name="difficulty"
                    className="form-select"
                    onChange={handleFormChange}
                    required
                    value={newQuestion.difficulty}
                  >
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label className="form-label">Explanation</label>
                <textarea
                  name="explanationText"
                  className="form-control"
                  onChange={handleFormChange}
                  required
                  rows="3"
                  placeholder="Provide a detailed explanation..."
                  value={newQuestion.explanationText}
                />
              </div>

              <div className="options-section">
                <label className="form-label">Options (Select the correct one)</label>
                {newQuestion.options.map((opt, index) => (
                  <div key={index} className="option-input">
                    <input
                      type="radio"
                      name="isCorrect"
                      checked={opt.isCorrect}
                      onChange={(e) => handleOptionChange(index, e)}
                      className="option-radio"
                    />
                    <input
                      type="text"
                      name="optionText"
                      placeholder={`Option ${index + 1}`}
                      className="form-control"
                      onChange={(e) => handleOptionChange(index, e)}
                      required
                      value={opt.optionText}
                    />
                  </div>
                ))}
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary btn-lg">
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="questions-section">
        <div className="section-header">
          <h2 className="section-title">Existing Questions ({questions.length})</h2>
        </div>

        {questions.length === 0 ? (
          <div className="empty-state card">
            <div className="empty-icon">📝</div>
            <h3>No questions found</h3>
            <p>Add your first question to get started!</p>
          </div>
        ) : (
          <div className="questions-table card">
            <div className="table-responsive">
              <table className="questions-table-content">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Question</th>
                    <th>Category</th>
                    <th>Difficulty</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((q, index) => (
                    <tr key={q.id}>
                      <td className="question-id">{index + 1}</td>
                      <td className="question-text">
                        {q.questionText.substring(0, 80)}
                        {q.questionText.length > 80 ? '...' : ''}
                      </td>
                      <td>
                        <span className="category-badge">
                          {q.category.name}
                        </span>
                      </td>
                      <td>
                        <span className={`difficulty-badge ${q.difficulty.toLowerCase()}`}>
                          {q.difficulty}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => triggerDelete(q.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBoard;
