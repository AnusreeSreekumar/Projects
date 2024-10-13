const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris",
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars",
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
        answer: "William Shakespeare",
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean",
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Fe", "Pb"],
        answer: "Au",
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Japan", "South Korea", "Thailand"],
        answer: "Japan",
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Diamond", "Iron", "Quartz"],
        answer: "Diamond",
    },
    {
        question: "Which is the smallest continent by land area?",
        options: ["Europe", "Australia", "Asia", "Antarctica"],
        answer: "Australia",
    },
    {
        question: "What is the currency of the United Kingdom?",
        options: ["Dollar", "Euro", "Pound Sterling", "Yen"],
        answer: "Pound Sterling",
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent Van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        answer: "Leonardo da Vinci",
    },
    {
        question: "What is the largest desert in the world?",
        options: ["Sahara Desert", "Arabian Desert", "Gobi Desert", "Antarctic Desert"],
        answer: "Antarctic Desert",
    },
    {
        question: "What is the tallest mountain in the world?",
        options: ["K2", "Kangchenjunga", "Lhotse", "Mount Everest"],
        answer: "Mount Everest",
    },
    {
        question: "What is the name of the first man to walk on the moon?",
        options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Michael Collins"],
        answer: "Neil Armstrong",
    },
    {
        question: "In which year did World War II end?",
        options: ["1945", "1946", "1944", "1939"],
        answer: "1945",
    },
    {
        question: "Which element has the atomic number 1?",
        options: ["Oxygen", "Hydrogen", "Helium", "Carbon"],
        answer: "Hydrogen",
    },
    {
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        answer: "Canberra",
    },
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestions() {
    const questionsContainer = document.getElementById("container");
    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question-container";
        questionDiv.id = `question-${index}`;

        questionDiv.innerHTML = `
                <h2 class="text-xl font-semibold mb-4">${q.question}</h2>
                <div class="flex flex-col">
                    ${q.options.map(option => `
                        <label class="mb-2">
                            <input type="radio" name="question-${index}" value="${option}" class="mr-2">
                            ${option}
                        </label>
                    `).join('')}
                </div>
            `;

        questionsContainer.appendChild(questionDiv);
    });
    showQuestion();
}

function showQuestion() {
    document.querySelectorAll('.question-container').forEach((q, i) => {
        q.classList.toggle('active', i === currentQuestionIndex);
    });
}

function showFeedback(isCorrect) {
    const feedbackDiv = document.getElementById("feedback");
    feedbackDiv.textContent = isCorrect ? "🎉 Correct Answer! 🎉" : "❌ Wrong Answer! Try again.";
    feedbackDiv.style.display = "block";
    setTimeout(() => {
        feedbackDiv.style.display = "none";
    }, 2000);
}

document.getElementById("next-btn").addEventListener("click", () => {
    const selectedOption = document.querySelector(`input[name="question-${currentQuestionIndex}"]:checked`);
    if (!selectedOption) {
        alert("Please select an answer before proceeding!");
        return;
    }

    const isCorrect = selectedOption.value === questions[currentQuestionIndex].answer;
    if (isCorrect) score++;

    showFeedback(isCorrect);
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        alert(`Quiz completed! Your final score is ${score} out of ${questions.length}.`);
        // Optionally, reset the quiz or show results in a different way
    }
});

loadQuestions();