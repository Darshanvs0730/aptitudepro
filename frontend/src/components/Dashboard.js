import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuestionService from '../services/QuestionService';
import { useToast } from './Toast';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    QuestionService.getAttempts()
      .then((response) => {
        const attempts = response.data;
        if (attempts.length > 0) {
          processStats(attempts);
        } else {
          setStats({
            totalAttempts: 0,
            correctAnswers: 0,
            overallAccuracy: 0,
            categories: {},
            difficultyStats: {}
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        setError('Could not load your statistics. Please try again later.');
        setLoading(false);
        showToast('Failed to load dashboard data', 'error');
      });
  };

  const processStats = (attempts) => {
    const totalAttempts = attempts.length;
    const correctAnswers = attempts.filter(a => a.wasCorrect).length;
    const overallAccuracy = totalAttempts > 0
      ? ((correctAnswers / totalAttempts) * 100).toFixed(1)
      : 0;

    const categories = {};
    const difficultyStats = {};

    attempts.forEach(attempt => {
      const categoryName = attempt.question.category.name;
      const difficulty = attempt.question.difficulty;

      if (!categories[categoryName]) {
        categories[categoryName] = { total: 0, correct: 0 };
      }
      categories[categoryName].total++;
      if (attempt.wasCorrect) {
        categories[categoryName].correct++;
      }

      if (!difficultyStats[difficulty]) {
        difficultyStats[difficulty] = { total: 0, correct: 0 };
      }
      difficultyStats[difficulty].total++;
      if (attempt.wasCorrect) {
        difficultyStats[difficulty].correct++;
      }
    });

    setStats({
      totalAttempts,
      correctAnswers,
      overallAccuracy,
      categories,
      difficultyStats
    });
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <div className="error-card card">
          <h3>Something went wrong</h3>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={loadStats}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <div className="dashboard-header-row">
        <h1 className="page-title">Overview</h1>
        <Link to="/quiz" className="btn btn-primary">Start Practice</Link>
      </div>

      <div className="dashboard-grid">
        {/* Main Stats Card (Project Overview Style) */}
        <div className="card overview-card">
          <div className="card-header">
            <h3>Progress Summary</h3>
            <span className="status-badge success">Active Learner</span>
          </div>
          <div className="overview-stats">
            <div className="overview-stat-item">
              <span className="overview-label">Total Questions</span>
              <span className="overview-value">{stats.totalAttempts}</span>
            </div>
            <div className="overview-stat-item">
              <span className="overview-label">Accuracy</span>
              <span className="overview-value highlight">{stats.overallAccuracy}%</span>
            </div>
            <div className="overview-stat-item">
              <span className="overview-label">Correct</span>
              <span className="overview-value">{stats.correctAnswers}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions / Categories (Production Deploys Style) */}
        <div className="card performance-card">
          <div className="card-header">
            <h3>Performance by Category</h3>
          </div>
          <div className="category-list-compact">
            {Object.keys(stats.categories).length > 0 ? (
              Object.keys(stats.categories).slice(0, 3).map(cat => (
                <div key={cat} className="category-row">
                  <span className="cat-name">{cat}</span>
                  <span className="cat-metric">
                    {((stats.categories[cat].correct / stats.categories[cat].total) * 100).toFixed(0)}%
                  </span>
                </div>
              ))
            ) : (
              <div className="empty-text">No data yet</div>
            )}
            {Object.keys(stats.categories).length > 3 && (
              <div className="see-more">...and {Object.keys(stats.categories).length - 3} more</div>
            )}
          </div>
        </div>

        {/* Difficulty Graph Placeholder (Observability Style) */}
        <div className="card difficulty-card">
          <div className="card-header">
            <h3>Difficulty Mastery</h3>
          </div>
          <div className="difficulty-bars">
            {['EASY', 'MEDIUM', 'HARD'].map(level => {
              const data = stats.difficultyStats[level] || { total: 0, correct: 0 };
              const acc = data.total > 0 ? (data.correct / data.total) * 100 : 0;
              return (
                <div key={level} className="diff-row">
                  <span className="diff-label">{level}</span>
                  <div className="diff-bar-bg">
                    <div className="diff-bar-fill" style={{ width: `${acc}%` }}></div>
                  </div>
                  <span className="diff-val">{acc.toFixed(0)}%</span>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
