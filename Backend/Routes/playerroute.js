import { Router } from "express";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";

import { Player } from "../Models/playerSet.js";
import { authenticate } from "../Middleware/auth.js";
import { QuestionSet } from "../Models/questionSet.js";
import { QuizCatgry } from "../Models/quizCatgry.js";
import {quizEventEmitter} from "../quizEvents.js";

dotenv.config();
const playerroute = Router();
const SecretKey = process.env.secretKey

mongoose.connect('mongodb://localhost:27017/TriviaHub')

playerroute.get('/', (req, res) => {

    res.send("Hello World")
});

//User Signup 
playerroute.post('/signup_user', async (req, res) => {

    try {

        const data = req.body;
        const { Username,
            Email,
            Password
        } = data
        console.log("Req data:", data);

        const Role = "User"
        const newP = await bcrypt.hash(Password, 10);
        const existingUser = await Player.findOne({ dbEmail: Email })

        if (existingUser) {

            res.status(404).json({ message: "Player exists in DB" })
            console.log("User already registered");
        }
        else {

            const newPlayer = new Player({
                dbUsername: Username,
                dbEmail: Email,
                dbPassword: newP,
                dbRole: Role
            })
            await newPlayer.save();
            res.status(200).json({ message: "Player entry created" });
            console.log("User registred successfully");
        }
    }
    catch (error) {
        console.log(error);
    }

})

//User login
playerroute.post('/login_user', async (req, res) => {

    try {

        const { Email, Password } = req.body

        const result = await Player.findOne({ dbEmail: Email })
        if (result) {

            const isvalid = await bcrypt.compare(Password, result.dbPassword)
            if (isvalid) {
                const token = jwt.sign({ username: result.dbEmail, userrole: result.dbRole }, SecretKey, { expiresIn: '1h' })
                console.log("Token:", token);
                res.cookie('AuthToken', token, {
                    httpOnly: true
                })
                res.status(200).json({ message: "Success" })
                console.log("Login successfull");
            }
            else {
                res.status(404).json({ message: "Incorrect credentials" })
                console.log("Please check your credentials");
            }
        }
        else {
            res.status(404).json({ message: "New User" })
            console.log("Please register");
        }
    }
    catch (error) {
        res.status(404).json(error)
        console.log(error);
    }
})

//Start Quiz
playerroute.post('/startQuiz', authenticate, async (req, res) => {

    const loginRole = req.UserRole;
    try {

        if (loginRole == 'User') {

            const { playerId, Title } = req.body;
            const quizCategory = await QuizCatgry.findOne({ dbTitle : Title });
            console.log("Category", quizCategory);

            if (!quizCategory) {
                return res.status(404).json({ message: 'Quiz category not found' });
            }
            else {

                // Fetch questions from the QuestionSet for the selected category
                const questionSet = await QuestionSet.findOne({ dbquizId: quizCategory._id }).populate('dbquestions');
                console.log("Question Set", questionSet);

                if (!questionSet || questionSet.length === 0) {
                    return res.status(404).json({ message: 'No question set found for this category.' });
                }

                // Now retrieve the questions from questionSet
                const questions = questionSet.dbquestions;
                console.log("Actual Questions", questions);


                // Ensure that questions is an array
                if (!Array.isArray(questions)) {
                    return res.status(500).json({ message: 'Questions data is not an array.' });
                }

                // Map through the questions to structure the data as needed
                const formattedQuestions = questions.map(question => ({
                    id: question._id,
                    text: question.questionText,
                    options: question.options, // Access the options directly
                }));

                console.log('Formatted Questions:', formattedQuestions);

                // Use formattedQuestions in your response or further logic
                res.status(200).json({
                    message: 'Questions retrieved successfully.',
                    questions: formattedQuestions
                });
            }
        }
        else {
            console.log("Please login");
        }
    }
    catch (error) {
        console.log(error)
    }
})

//Score calculation:
playerroute.post('/submit-quiz', authenticate, async (req, res) => {

    const loginRole = req.UserRole;
    try {
        if (loginRole == 'User') {

            const { playerId, answers, categoryId } = req.body;
            let totalScore = 0;
            let correctAnswers = 0;

            const questionSet = await QuestionSet.findOne({ dbquizId: categoryId });
            console.log("QuestionSet: ", questionSet);

            if (!questionSet) {
                return res.status(404).json({ message: 'Question set not found for this category' });
            }
            else {

                const correctAnswersList = questionSet.dbquestions.map(question => question.answer);
                console.log("Correct answer list: ", correctAnswersList);

                answers.forEach((answer, idx) => {
                    if (answer === correctAnswersList[idx]) {
                        totalScore += 4;  // Correct answer, +4 points
                        correctAnswers++;
                    } else {
                        totalScore -= 2;  // Incorrect answer, -2 points
                    }
                });

                quizEventEmitter.emit('quizCompleted', {
                    playerId,
                    categoryId,
                    score: totalScore
                });

            }
        }
        else {
            console.log("Please login");
        }
    }
    catch (error) {
        console.log(error);
    }
})

export { playerroute }