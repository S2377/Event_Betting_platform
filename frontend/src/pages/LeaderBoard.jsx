import React, { useEffect, useState } from 'react';
import { fetchLeaderboard } from '../api'; // Import API function
import './leaderBoard.css'// Optional: Add styles

const Leaderboard = () => {
    const [leaders, setLeaders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getLeaderboard = async () => {
            try {
                const response = await fetchLeaderboard();
                setLeaders(response.data);
            } catch (err) {
                setError('Failed to fetch leaderboard');
            }
        };

        getLeaderboard();
    }, []);

    if (error) return <div>{error}</div>;

    return (
        <div className="leaderboard">
            <h2>Leaderboard</h2>
            <ul>
                {leaders.map((user, index) => (
                    <li key={user._id} className="leaderboard-item">
                        <span>{index + 1}. {user.name}</span>
                        <span>Total Winnings: ₹{user.totalWinnings}</span>
                        <span>Wallet Balance: ₹{user.walletBalance}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;
