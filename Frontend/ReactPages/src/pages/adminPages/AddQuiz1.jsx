import React, { useState, useEffect } from "react";
import quizData from "../../utils/quizData.json"; // Import the file containing questions and difficulty

const AddQuiz = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [questions, setQuestions] = useState([]);

  // Populate questions and difficulty from the JSON file
  useEffect(() => {
    setQuestions(quizData.questions); // Load questions
    setDifficulty(quizData.difficulty); // Load difficulty level
  }, []);

  const handleQuestionChange = (index, key, value) => {
    const updatedQuestions = [...questions];
    if (key === "options") {
      updatedQuestions[index].options = value;
    } else {
      updatedQuestions[index][key] = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quizDetails = { category: selectedCategory, difficulty, questions };

    try {
      const response = await fetch(`http://localhost:3000/addquestionset/${selectedCategory}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizDetails),
      });

      if (response.ok) {
        console.log("Quiz added successfully!");
      } else {
        console.error("Error adding quiz:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="add-quiz-container">
      <h2>Add Quiz</h2>
      <form onSubmit={handleSubmit}>
        {/* Category Selection */}
        <div>
          <label htmlFor="category">Select Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">-- Select a Category --</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.dbTitle}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label htmlFor="difficulty">Difficulty Level:</label>
          <input
            type="text"
            id="difficulty"
            value={difficulty}
            readOnly // Automatically filled
          />
        </div>

        {/* Questions */}
        <h3>Questions</h3>
        {questions.map((question, index) => (
          <div key={index} className="question">
            <label>Question {index + 1}</label>
            <input
              type="text"
              value={question.questionText}
              onChange={(e) => handleQuestionChange(index, "questionText", e.target.value)}
            />
            <div className="options">
              {question.options.map((option, optionIndex) => (
                <input
                  key={optionIndex}
                  type="text"
                  placeholder={`Option ${optionIndex + 1}`}
                  value={option}
                  onChange={(e) =>
                    handleQuestionChange(index, "options", [
                      ...question.options.slice(0, optionIndex),
                      e.target.value,
                      ...question.options.slice(optionIndex + 1),
                    ])
                  }
                />
              ))}
            </div>
            <input
              type="text"
              placeholder="Correct Answer"
              value={question.answer}
              onChange={(e) => handleQuestionChange(index, "answer", e.target.value)}
            />
          </div>
        ))}

        <button type="submit">Submit Quiz</button>
      </form>
    </div>
  );
};

export default AddQuiz;
