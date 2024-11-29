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
                const response = await fetch(`http://localhost:3000/takequiz/${quizId}`);
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
    const handleSubmit = () => {
        // Submit the answers to the backend or handle locally
        console.log('Submitting answers:', selectedOptions);
        setQuizCompleted(true); // Disable further navigation
    };

    if (questionSet.length === 0) return <div>Loading...</div>;

    const currentQuestion = questionSet[currentQuestionIndex];

    return (
        <div className="quiz-container">
            <div className="question-card">
                <h2>{currentQuestion.questionText}</h2>
                <div className="options">
                    {currentQuestion.options.map((option, index) => (
                        <div key={index}>
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
                <div className="navigation-buttons">
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                    >
                        Previous
                    </button>
                    {quizCompleted ? (
                        <button onClick={handleSubmit}>Submit</button>
                    ) : (
                        <button
                            onClick={handleNext}
                            disabled={selectedOptions[currentQuestionIndex] == null}
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
