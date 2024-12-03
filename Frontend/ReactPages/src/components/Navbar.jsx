import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import checkAuth from '../utils/checkAuth'
import user from '../assets/images/user.png'

const AdminNavbar = () => {

    const [playerName, setPlayerName] = useState('');

    useEffect(() => {
        const fetchPlayerName = async () => {
            const authData = await checkAuth();
            console.log('fetched using protRt: ', authData);

            const name = authData.name;
            setPlayerName(name);
        };

        fetchPlayerName();
    }, []);

    return (

        <div className="bg-gray-100 text-purple-950 px-8 py-4 flex justify-between items-center shadow-md">
            {/* User Avatar */}
            <img src={user} alt="User Avatar" className="w-12 h-12 rounded-full" />

            {/* Welcome Message */}
            <h2 className="font-bold text-2xl text-purple-700">
                Welcome, {playerName}
            </h2>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8 text-gray-700 font-medium hover:underline">
                <Link to="/player-dashboard" className="ml-4">
                    Dashboard
                </Link>
                {/* Uncomment if needed */}
                {/* <Link to="/courses" className="ml-4">Courses</Link> */}
                <Link to="/leader-board" className="ml-4">
                    Leader Board
                </Link>
                {playerName && (
                    <Link to={`/history/${playerName}`} className="ml-4">
                        Player History
                    </Link>
                )}
                <Logout />
            </div>
        </div>
    )
}

export default AdminNavbar
