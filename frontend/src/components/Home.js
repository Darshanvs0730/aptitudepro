import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import SpecularButton from './SpecularButton';
import Lanyard from './Lanyard';
import ScrollExpand from './ScrollExpand';
import GlassIcons from './GlassIcons';
import FlowingMenu from './FlowingMenu';
import { FiTarget, FiBarChart2, FiZap, FiAward } from 'react-icons/fi';
import './Home.css';

const Home = () => {
  const currentUser = AuthService.getCurrentUser();
  const navigate = useNavigate();

  const glassIconItems = [
    { icon: <FiTarget size={24} />, color: 'blue', label: 'Tests' },
    { icon: <FiBarChart2 size={24} />, color: 'purple', label: 'Analytics' },
    { icon: <FiZap size={24} />, color: 'orange', label: 'Feedback' },
    { icon: <FiAward size={24} />, color: 'green', label: 'Learning' },
  ];

  const flowingMenuItems = [
    { link: '#', text: 'Quantitative', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&h=400&fit=crop' },
    { link: '#', text: 'Reasoning', image: 'https://images.unsplash.com/photo-1596496181848-3091d4878b24?q=80&w=600&h=400&fit=crop' },
    { link: '#', text: 'Verbal', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&h=400&fit=crop' },
    { link: '#', text: 'Analytics', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&h=400&fit=crop' }
  ];

  const stats = [
    { number: '10K+', label: 'Practice Questions' },
    { number: '50K+', label: 'Active Learners' },
    { number: '95%', label: 'Success Rate' },
    { number: '24/7', label: 'Available' }
  ];

  return (
    <div className="home-container" style={{ background: '#000' }}>
      {/* Hero Section */}
      <section className="hero-section" style={{ overflow: 'hidden' }}>
        <div className="hero-content-wrapper" style={{ zIndex: 10 }}>
          <div className="hero-content animate-slide-up">
            <div className="hero-badge animate-scale-in delay-200">
              <span className="badge-icon">✨</span>
              <span>Trusted by 50,000+ learners worldwide</span>
            </div>
            <h1 className="hero-title animate-slide-up delay-300">
              Master Aptitude Tests
              <span className="text-gradient"> Like Never Before</span>
            </h1>
            <p className="hero-description animate-slide-up delay-400">
              Elevate your aptitude skills with our comprehensive practice platform.
              Get instant feedback, track your progress, and achieve excellence.
            </p>
            <div className="hero-actions animate-slide-up delay-500">
              {currentUser ? (
                <div style={{ display: 'inline-block' }}>
                  <SpecularButton
                    size="lg"
                    radius={8}
                    tint="#B9FF66"
                    tintOpacity={0.5}
                    blur={0}
                    textColor="#050505"
                    lineColor="#B9FF66"
                    baseColor="#B9FF66"
                    intensity={1.2}
                    shineSize={12}
                    shineFade={30}
                    thickness={1}
                    speed={0.4}
                    followMouse
                    proximity={250}
                    autoAnimate={false}
                    onClick={() => navigate('/quiz')}
                    className="hero-cta neo-button"
                  >
                    Start Practice Now
                  </SpecularButton>
                </div>
              ) : (
                <>
                  <div style={{ display: 'inline-block', marginRight: '1rem' }}>
                    <SpecularButton
                      size="lg"
                      radius={8}
                      tint="#B9FF66"
                      tintOpacity={0.5}
                      blur={0}
                      textColor="#050505"
                      lineColor="#B9FF66"
                      baseColor="#B9FF66"
                      intensity={1.2}
                      shineSize={12}
                      shineFade={30}
                      thickness={1}
                      speed={0.4}
                      followMouse
                      proximity={250}
                      autoAnimate={false}
                      onClick={() => navigate('/register')}
                      className="hero-cta neo-button"
                    >
                      Get Started Free
                    </SpecularButton>
                  </div>
                  <div style={{ display: 'inline-block' }}>
                    <SpecularButton
                      size="lg"
                      radius={8}
                      tint="#fff"
                      tintOpacity={0.1}
                      blur={0}
                      textColor="#fff"
                      lineColor="#666"
                      baseColor="#111"
                      intensity={1.2}
                      shineSize={12}
                      shineFade={30}
                      thickness={1}
                      speed={0.4}
                      followMouse
                      proximity={250}
                      autoAnimate={false}
                      onClick={() => navigate('/login')}
                      className="hero-cta-secondary"
                    >
                      Sign In
                    </SpecularButton>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="hero-visual" style={{ position: 'relative', height: '600px', width: '100%', pointerEvents: 'auto' }}>
             <Lanyard position={[0, 0, 25]} gravity={[0, -40, 0]} userName={currentUser ? currentUser.username : null} />
          </div>
        </div>
      </section>

      {/* Cinematic Reveal of the Live Platform */}
      <section className="showcase-section" style={{ background: '#000' }}>
        <ScrollExpand
          mediaType="image"
          src="/project-hero.png"
          scrollHint="Scroll to Explore"
          useWindowScroll={true}
          scrollDistance={0.6}
          holdDistance={0.1}
        >
          <h2 style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0 0 1rem', color: 'var(--text-primary)', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>Platform Overview</h2>
          <p style={{ fontSize: '1.2rem', maxWidth: '600px', color: 'var(--text-secondary)', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
            Experience our intuitive dashboard live. Track your accuracy, analyze your weaknesses, and conquer every section with ease.
          </p>
        </ScrollExpand>
      </section>

      {/* Stats Section with Glass Icons */}
      <section className="stats-section" style={{ background: '#0a0a0a', padding: '6rem 0' }}>
        <div className="container">
          <div className="section-header animate-slide-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
             <h2 className="section-title text-gradient" style={{ fontSize: '2.5rem' }}>Interactive Features</h2>
             <p className="section-description" style={{ color: 'var(--text-secondary)' }}>Experience our glassmorphic interface.</p>
          </div>
          <GlassIcons items={glassIconItems} className="custom-glass-icons" />
          
          <div className="stats-grid" style={{ marginTop: '5rem' }}>
            {stats.map((stat, index) => (
              <div key={index} className="stat-item glass hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s`, border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
                <div className="stat-number text-gradient" style={{ fontSize: '3rem', fontFamily: 'Space Grotesk' }}>{stat.number}</div>
                <div className="stat-label" style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flowing Menu Section */}
      <section className="topics-section" style={{ padding: '0', background: '#0a0a0a' }}>
        <div style={{ height: '600px', position: 'relative' }}>
          <FlowingMenu items={flowingMenuItems} />
        </div>
      </section>

      {/* CTA Section */}
      {!currentUser && (
        <section className="cta-section animate-scale-in delay-200" style={{ paddingBottom: '4rem' }}>
          <div className="container">
            <div className="cta-card glass" style={{ border: '2px solid var(--primary)', background: '#111' }}>
              <div className="cta-content">
                <h2 className="cta-title text-gradient">Ready to Transform Your Aptitude Skills?</h2>
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
                <p className="cta-note" style={{ color: 'var(--text-secondary)' }}>No credit card required • Free forever • Cancel anytime</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
