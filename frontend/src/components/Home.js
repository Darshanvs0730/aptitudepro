import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';
import './Home.css';

const Home = () => {
  const currentUser = AuthService.getCurrentUser();

  const features = [
    {
      icon: '🎯',
      title: 'Comprehensive Tests',
      description: 'Practice with thousands of aptitude questions covering quantitative, logical reasoning, and verbal ability.'
    },
    {
      icon: '📊',
      title: 'Real-time Analytics',
      description: 'Track your performance with detailed insights, accuracy rates, and progress over time.'
    },
    {
      icon: '⚡',
      title: 'Instant Feedback',
      description: 'Get immediate explanations for every question to understand concepts better.'
    },
    {
      icon: '🎓',
      title: 'Personalized Learning',
      description: 'Adaptive difficulty levels and personalized recommendations based on your performance.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Practice Questions' },
    { number: '50K+', label: 'Active Learners' },
    { number: '95%', label: 'Success Rate' },
    { number: '24/7', label: 'Available' }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Sign Up Free',
      description: 'Create your account in seconds. No credit card required.'
    },
    {
      step: '02',
      title: 'Take Practice Tests',
      description: 'Start with our comprehensive question bank covering all topics.'
    },
    {
      step: '03',
      title: 'Track Progress',
      description: 'Monitor your performance and identify areas for improvement.'
    },
    {
      step: '04',
      title: 'Excel & Succeed',
      description: 'Achieve your goals with continuous practice and detailed insights.'
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient animate-pulse"></div>
          <div className="hero-particles"></div>
        </div>
        <div className="hero-content-wrapper">
          <div className="hero-content animate-slide-up">
            <div className="hero-badge animate-scale-in delay-200">
              <span className="badge-icon">✨</span>
              <span>Trusted by 50,000+ learners worldwide</span>
            </div>
            <h1 className="hero-title animate-slide-up delay-300">
              Master Aptitude Tests
              <span className="gradient-text"> Like Never Before</span>
            </h1>
            <p className="hero-description animate-slide-up delay-400">
              Elevate your aptitude skills with our comprehensive practice platform.
              Get instant feedback, track your progress, and achieve excellence.
            </p>
            <div className="hero-actions animate-slide-up delay-500">
              {currentUser ? (
                <Link to="/quiz" className="btn btn-primary btn-lg hero-cta hover-glow">
                  Start Practice Now
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary btn-lg hero-cta hover-glow">
                    Get Started Free
                  </Link>
                  <Link to="/login" className="btn btn-outline btn-lg hero-cta-secondary hover-lift">
                    Sign In
                  </Link>
                </>
              )}
            </div>
            <div className="hero-trust animate-fade-in delay-700">
              <p className="trust-text">No credit card required • Free forever</p>
            </div>
          </div>
          <div className="hero-visual animate-float delay-200">
            <div className="visual-container glass">
              <div className="gradient-orb orb-1 animate-pulse"></div>
              <div className="gradient-orb orb-2 animate-pulse delay-500"></div>
              <div className="gradient-orb orb-3 animate-pulse delay-700"></div>

              <div className="stats-circle animate-scale-in delay-300">
                <div className="stats-ring">
                  <svg className="progress-ring" viewBox="0 0 200 200">
                    <circle
                      className="progress-ring-circle"
                      stroke="url(#gradient1)"
                      strokeWidth="8"
                      fill="transparent"
                      r="85"
                      cx="100"
                      cy="100"
                      strokeDasharray="534"
                      strokeDashoffset="160"
                    />
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="stats-content">
                  <div className="stats-number">95%</div>
                  <div className="stats-label">Success Rate</div>
                </div>
              </div>

              <div className="feature-indicator indicator-1 glass animate-slide-left delay-400">
                <div className="indicator-dot"></div>
                <div className="indicator-pulse"></div>
                <div className="indicator-label">10K+ Questions</div>
              </div>
              <div className="feature-indicator indicator-2 glass animate-slide-right delay-500">
                <div className="indicator-dot"></div>
                <div className="indicator-pulse"></div>
                <div className="indicator-label">Real-time Analytics</div>
              </div>
              <div className="feature-indicator indicator-3 glass animate-slide-up delay-600">
                <div className="indicator-dot"></div>
                <div className="indicator-pulse"></div>
                <div className="indicator-label">Progress Tracking</div>
              </div>

              <div className="grid-background"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item glass hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="stat-number gradient-text">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header animate-slide-up">
            <h2 className="section-title">Everything You Need to Succeed</h2>
            <p className="section-description">
              Powerful features designed to help you master aptitude tests
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card card glass hover-lift animate-slide-up" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="feature-icon-wrapper">
                  <div className="feature-icon animate-float">{feature.icon}</div>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header animate-slide-up">
            <h2 className="section-title">How It Works</h2>
            <p className="section-description">
              Get started in minutes and start improving today
            </p>
          </div>
          <div className="steps-container">
            {howItWorks.map((step, index) => (
              <div key={index} className="step-item glass hover-lift animate-slide-right" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="step-number gradient-text">{step.step}</div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
                {index < howItWorks.length - 1 && <div className="step-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!currentUser && (
        <section className="cta-section animate-scale-in delay-200">
          <div className="container">
            <div className="cta-card glass">
              <div className="cta-content">
                <h2 className="cta-title">Ready to Transform Your Aptitude Skills?</h2>
                <p className="cta-description">
                  Join thousands of learners who are already improving their skills every day.
                </p>
                <div className="cta-actions">
                  <Link to="/register" className="btn btn-primary btn-lg cta-button hover-glow">
                    Get Started Free
                  </Link>
                  <Link to="/login" className="btn btn-outline btn-lg cta-button-secondary hover-lift">
                    Sign In
                  </Link>
                </div>
                <p className="cta-note">No credit card required • Free forever • Cancel anytime</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
