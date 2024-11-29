import React from 'react';
import { Link } from 'react-router-dom';

const QuizCard = ({ quiz, isAdmin }) => {
    return (
        <div
            key={quiz.dbquizId} // Assuming dbquizId is unique
            className="bg-purple-100 rounded-md shadow-2xl flex flex-col items-center justify-center mx-5 my-5 py-10 w-60"
        >
            <Link to={`/quizdetails/${quiz.quizId}`} className="font-bold text-lg text-purple-900">
                {quiz.category}
            </Link>
            <p className="text-blue-500 font-semibold group-hover:text-white my-2 mx-5">
                Difficulty: {quiz.difficulty}
            </p>
            <p className="text-black group-hover:text-white my-2 mx-5">
                Number of Questions: {quiz.questionCount}
            </p>
            {!isAdmin && (
                <Link
                    to={`/takequiz/${quiz.quizId}`}
                    className="mt-4 w-32 h-10 p-2 bg-blue-500 rounded-md text-white hover:text-slate-200"
                >
                    Take this Quiz
                </Link>
            )}
        </div>
    );
};

export default QuizCard;
