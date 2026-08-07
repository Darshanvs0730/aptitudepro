import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authHeader from '../services/auth-header';
import './Leaderboard.css';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/leaderboard?limit=10', { headers: authHeader() })
            .then(response => {
                setLeaderboard(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load leaderboard.');
                setLoading(false);
            });
    }, []);

    return (
        <div className="leaderboard-container fade-in">
            <h2 className="leaderboard-title">Top Performers</h2>
            <div className="leaderboard-card">
                {loading && <p>Loading leaderboard...</p>}
                {error && <p className="error-msg">{error}</p>}
                
                {!loading && !error && leaderboard.length === 0 && (
                    <p>No attempts recorded yet. Be the first to start practicing!</p>
                )}

                {!loading && !error && leaderboard.length > 0 && (
                    <table className="leaderboard-table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Username</th>
                                <th>Correct Answers</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((entry, index) => (
                                <tr key={index} className={index < 3 ? `top-${index + 1}` : ''}>
                                    <td>#{index + 1}</td>
                                    <td>{entry.username}</td>
                                    <td>{entry.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
