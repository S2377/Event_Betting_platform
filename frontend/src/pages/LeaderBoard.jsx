import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [userRank, setUserRank] = useState(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const { data } = await axios.get('http://localhost:5000/leaderboard');
            setLeaderboard(data);
        };

        const fetchUserRank = async (userId) => {
            const { data } = await axios.get(`http://localhost:5000/leaderboard/${userId}`);
            setUserRank(data);
        };

        fetchLeaderboard();
        fetchUserRank('6753e1a30487e34034963365'); // Replace with logged-in user ID
    }, []);

    return (
        <div>
            <h1>Leaderboard</h1>
            <ol>
                {leaderboard.map((user, index) => (
                    <li key={user._id}>
                        {user.username}: {user.totalAmountBet}
                    </li>
                ))}
            </ol>
            {userRank && (
                <div>
                    <h2>Your Rank</h2>
                    <p>Rank: {userRank.rank}</p>
                    <p>Total Amount Bet: {userRank.user.totalAmountBet}</p>
                </div>
            )}
        </div>
    );
};

export default Leaderboard;
