import React, { useState, useEffect } from 'react';

const Dashboard = () => {

    const [playerData, setPlayerData] = useState(null);
    const [questnSet, setQuestnSet] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasFetchedData, setHasFetchedData] = useState(false);
    const [quizHistoryLength, setQuizHistoryLength] = useState(0);
    const [totalScore, setTotalScore] = useState(0);

    useEffect(() => {
        if (!hasFetchedData) {
            const fetchUserData = async () => {
                try {
                    const response = await fetch('http://localhost:3000/dashboard', {
                        method: 'GET',
                        credentials: 'include',
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }

                    const result = await response.json();
                    console.log('Retrieved Data:', result);

                    const userData = result.data.player; // Access the "data" key
                    console.log('Dashboard Data:', userData);

                    // setPlayerData(dashboardData);
                    // setQuizHistoryLength(dashboardData.dbQuizHistory?.length || 0);
                    // setTotalScore(dashboardData.dbTotalScore || 0);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                } finally {
                    setIsLoading(false);
                    setHasFetchedData(true); // Set flag to true after first fetch
                }
            };

            fetchUserData();
        }
    }, [hasFetchedData]);

    // if (isLoading) {
    //     return <p>Loading...</p>;
    // }

    // if (!userData) {
    //     return <p>Error loading data.</p>;
    // }

    // const isNewUser = quizHistoryLength === 0 && totalScore === 0;

    // return (
    //     <div className="w-screen min-h-screen bg-gradient-to-r from-emerald-300 via-cyan-100 to-sky-200 flex flex-col items-center py-8">

    //         {/* Welcome Section */}
    //         <div className="text-center mb-8">
    //             <h1 className="text-4xl font-bold text-gray-800">Welcome, {userData.dbUsername}</h1>
    //             {/* <p className="text-lg text-gray-600">Your role: {userData.dbRole}</p> */}
    //         </div>

    //         {/* Daily Task Section */}
    //         <div className="bg-white p-4 rounded-lg shadow-lg mb-8 w-80 sm:w-96">
    //             <h3 className="text-xl font-semibold text-center mb-4">Daily Task</h3>
    //             <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
    //                 <div
    //                     className="bg-yellow-500 h-2 rounded-full"
    //                     style={{
    //                         width: `${isNewUser ? 0 : (userData.dbScores.length / 10) * 100}%`,
    //                     }}
    //                 ></div>
    //             </div>
    //             <p className="text-center">{isNewUser ? "No tasks yet!" : `${userData.dbScores.length}/10 Tasks Completed`}</p>
    //         </div>

    //         {/* Quiz Section */}
    //         <div className="flex justify-around mb-8 w-full sm:w-96">
    //             <div className="text-center bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-200">
    //                 <img src="quiz-icon.png" alt="Football" className="mb-2" />
    //                 <p className="text-lg font-semibold">Football</p>
    //             </div>
    //             <div className="text-center bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-200">
    //                 <img src="quiz-icon.png" alt="Science" className="mb-2" />
    //                 <p className="text-lg font-semibold">Science</p>
    //             </div>
    //         </div>

    //         {/* History Section (Only for Existing Users) */}
    //         {!isNewUser && (
    //             <div className="bg-white p-4 rounded-lg shadow-lg mb-8 w-80 sm:w-96">
    //                 <h3 className="text-xl font-semibold mb-4">Quiz History</h3>
    //                 {userData.dbQuizHistory.map((history, index) => (
    //                     <div key={index} className="mb-2">
    //                         <p>
    //                             {history.categoryId}: {history.score} points on{" "}
    //                             {new Date(history.date).toLocaleDateString()}
    //                         </p>
    //                     </div>
    //                 ))}
    //             </div>
    //         )}

    //         {/* More Games Section */}
    //         <div className="w-80 sm:w-96 bg-white p-4 rounded-lg shadow-lg">
    //             <h3 className="text-xl font-semibold mb-4">More Games</h3>
    //             <div className="bg-gray-200 p-4 rounded-lg">
    //                 <p className="text-lg font-semibold">Language Quiz</p>
    //                 <p className="text-gray-500">15 Questions</p>
    //             </div>
    //         </div>
    //     </div>
    // );
};

export default Dashboard;
