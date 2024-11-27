import React from 'react';

const NewUserDashboard = () => {
    return (
        <div className="w-screen min-h-screen bg-gradient-to-r from-emerald-300 via-cyan-100 to-sky-200 flex flex-col items-center py-8">
            
            {/* Welcome Section */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Welcome to Trivia Hub</h1>
                <p className="text-lg text-gray-600">Let's get started, [User Name]</p>
            </div>

            {/* Daily Task Section */}
            <div className="bg-white p-4 rounded-lg shadow-lg mb-8 w-80 sm:w-96">
                <h3 className="text-xl font-semibold text-center mb-4">Daily Task</h3>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "0%" }}></div>
                </div>
                <p className="text-center">0/0 Questions</p>
            </div>

            {/* Quiz Section */}
            <div className="flex justify-around mb-8 w-full sm:w-96">
                <div className="text-center bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-200">
                    <img src="quiz-icon.png" alt="Football" className="mb-2" />
                    <p className="text-lg font-semibold">Football</p>
                </div>
                <div className="text-center bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-200">
                    <img src="quiz-icon.png" alt="Science" className="mb-2" />
                    <p className="text-lg font-semibold">Science</p>
                </div>
            </div>

            {/* More Games Section */}
            <div className="w-80 sm:w-96 bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">More Games</h3>
                <div className="bg-gray-200 p-4 rounded-lg">
                    <p className="text-lg font-semibold">Language Quiz</p>
                    <p className="text-gray-500">15 Questions</p>
                </div>
            </div>
        </div>
    );
};

export default NewUserDashboard;
