import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const TakeQuiz = () => {

    const [questionSet, setQuestionSet] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const { quizId } = useParams();

    // Fetch quiz data from the backend when the page loads
    useEffect(() => {
        const fetchQuizDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4000/takequiz/${quizId}`,{
                    credentials: 'include'
                });
                const data = await response.json();
                console.log('Retrieved data: ', data);
                setQuestionSet(data.existingquizSet.dbquestions || []);
            } catch (error) {
                console.log('Error fetching quiz data:', error);
            }
        };

        fetchQuizDetails();
    }, [quizId]);

    // Handle option selection
    const handleOptionChange = (questionIndex, selectedOption) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[questionIndex] = selectedOption;
        setSelectedOptions(newSelectedOptions);
    };

    // Handle next question
    const handleNext = () => {
        if (currentQuestionIndex < questionSet.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            setQuizCompleted(true); // Show submit after the last question
        }
    };

    // Handle previous question
    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        }
    };

    // Handle quiz submission
    const handleSubmit = async () => {
        // Submit the answers to the backend or handle locally
        console.log('Submitting answers:', selectedOptions);
        setQuizCompleted(true); // Disable further navigation

        // const response = await fetch('http://localhost:3000/submit-quiz', {

        //     method: 'PATCH',
        //     credentials: 'include',
        //     headers: {'Content Type' : 'application/json'},
        //     body: json
        // })
    };

    

    if (questionSet.length === 0) return <div>Loading...</div>;

    const currentQuestion = questionSet[currentQuestionIndex];

    return (
        <div className="quiz-container w-96 h-auto bg-gray-200 mt-[150px] ml-[500px] drop-shadow-xl">
            <div className="question-card">
                <h2 className='mb-8 p-4 text-4xl font-medium'>{currentQuestion.questionText}</h2>
                <div className="options p-4">
                    {currentQuestion.options.map((option, index) => (
                        <div key={index} className='space-x-4 ml-16 mb-4'>
                            <input
                                type="radio"
                                id={`option-${index}`}
                                name={`question-${currentQuestionIndex}`}
                                value={option}
                                checked={selectedOptions[currentQuestionIndex] === option}
                                onChange={() => handleOptionChange(currentQuestionIndex, option)}
                            />
                            <label htmlFor={`option-${index}`}>{option}</label>
                        </div>
                    ))}
                </div>
                <div className="navigation-buttons space-x-8 ml-16 pb-4">
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                        className='w-24 h-auto bg-cyan-400 rounded-md hover:text-white'
                    >
                        Previous
                    </button>
                    {quizCompleted ? (
                        <button onClick={handleSubmit} className='w-20 h-auto bg-cyan-400 rounded-md hover:text-white'>
                            Submit</button>
                    ) : (
                        <button
                            onClick={handleNext}
                            disabled={selectedOptions[currentQuestionIndex] == null}
                            className='w-20 h-auto bg-cyan-400 rounded-md hover:text-white'
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TakeQuiz
