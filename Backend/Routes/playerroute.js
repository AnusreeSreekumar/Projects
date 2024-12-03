import { Router } from "express";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";

import { Player } from "../Models/playerSet.js";
import { authenticate } from "../Middleware/auth.js";
import { QuestionSet } from "../Models/questionSet.js";
import { QuizCatgry } from "../Models/quizCatgry.js";
import { quizEventEmitter } from "../quizEvents.js";

dotenv.config();
const playerroute = Router();
// const SecretKey = process.env.secretKey

mongoose.connect('mongodb://localhost:27017/TriviaHub')

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

playerroute.get('/displayquizset', authenticate, async (req, res) => {

    const loginRole = req.userrole;
    try {

        if (loginRole == 'User') {

            const quizSet = await QuestionSet.find({}, 'dbquizId dbcategory dbdifficulty');
            const results = [];
            // console.log('Set is: ',quizSet);
            for (const cat of quizSet) {

                const quizCount = await QuizCatgry.findOne({ dbTitle: cat.dbcategory }, 'dbNumOfQuestions')

                results.push({
                    quizId: cat.dbquizId,
                    category: cat.dbcategory,
                    difficulty: cat.dbdifficulty,
                    questionCount: quizCount ? quizCount.dbNumOfQuestions : 0,
                })
            }
            res.status(200).json(results)
        }
    }
    catch (error) {
        console.log('Error fetching quiz categories:', error);
        res.status(500).json({ message: 'Failed to fetch quiz set' });
    }
})

playerroute.get('/takequiz/:Id', authenticate, async (req, res) => {

    const loginRole = req.userrole;
    try {

        if (loginRole == 'User') {
            const quizId = req.params.Id;
            console.log('Id in req: ', quizId);

            const existingquizSet = await QuestionSet.findOne({ dbquizId: quizId }, 'dbquestions')
            console.log('Existing QuizSet: ', existingquizSet);

            if (existingquizSet) {

                return res.status(200).json({ existingquizSet })
            }
            else {
                return res.status(404).json({ message: 'No QuizSet found' })
            }
        }
    }
    catch (error) {
        console.log('Error occured while fetching Quiz Set');
    }
})

//Score calculation and DB update:
playerroute.patch('/updatequizscore', authenticate, async (req, res) => {

    const loginRole = req.userrole;
    console.log(loginRole);
    
    const loginUser = req.username
    console.log(loginUser);
    
    try {
        if (loginRole == 'User') {

            const { answerSet, quizId } = req.body;
            let totalScore = 0;
            let correctAnswers = 0;
            let incorrectAnswers = 0;

            const questionSet = await QuestionSet.findOne({ dbquizId: quizId });
            console.log("QuestionSet: ", questionSet);

            if (!questionSet) {
                return res.status(404).json({ message: 'Question set not found for this category' });
            }
            else {

                const correctAnswersList = questionSet.dbquestions.map(question => question.answer);
                console.log("Correct answer list: ", correctAnswersList);

                answerSet.forEach((answer, idx) => {
                    // console.log(`Index: ${idx}, Answer: ${answer}`);
                    if (answer == correctAnswersList[idx]) {
                        correctAnswers += 2;  // Correct answer, +4 points

                    } else {
                        incorrectAnswers -= 2;  // Incorrect answer, -2 points

                    }
                });
                totalScore = correctAnswers + incorrectAnswers;
                console.log("Total Score: ", totalScore,);

                // Update Player Schema
                const player = await Player.findOne({ dbUsername: loginUser })
                console.log("Player Dtls: ", player);

                if (!player) {
                    return res.status(404).json({ message: 'Player not found' });
                }
                else {

                    // Add to dbScores
                    player.dbScores.push({
                        quizId: quizId,
                        score: totalScore,
                    });
                    // Add to dbQuizHistory
                    player.dbQuizHistory.push({
                        quizId,
                        score: totalScore,
                    });
                    // Update dbTotalScore
                    player.dbTotalScore += totalScore;
                    await player.save();
                    console.log(`Updated details for ${loginUser}:`, player);
                }
                return res.status(200).json({Scores: player.dbScores});
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

playerroute.get('/fetchScores/:Id', authenticate, async (req,res) => {

    const loginRole = req.userrole
    console.log(loginRole);
    
    const loginUser = req.username
    console.log(loginUser);
    
    // try{

        if(loginRole == 'User'){

            const quizId = req.params.Id;
            let latestscore = 0;

        const existingUser = await Player.findOne({dbUsername : loginUser})
        console.log(existingUser);
        
        if(existingUser){

            const scoreValues = existingUser.dbScores;
            console.log('score: ',scoreValues);
            
            scoreValues.forEach((score) => {
                if(score.quizId == quizId){
                    latestscore = score.score;
                }
            })
            res.status(200).json({Scores : latestscore})
            console.log('Score shared to front end');
        }
        else{

        }
        }
        
    // }
    // catch(error){

    // }
})

// playerroute.post('/submitquiz', authenticate, async (req, res) => {

//     // const loginRole = req.userrole;
//     try {

//         // if (loginRole == 'User') {

//             const { playerId, Title } = req.body;
//             const quizCategory = await QuizCatgry.findOne({ dbTitle: Title });
//             console.log("Category", quizCategory);

//             if (!quizCategory) {
//                 return res.status(404).json({ message: 'Quiz category not found' });
//             }
//             else {

//                 // Fetch questions from the QuestionSet for the selected category
//                 const questionSet = await QuestionSet.findOne({ dbquizId: quizCategory._id }).populate('dbquestions');
//                 console.log("Question Set", questionSet);

//                 if (!questionSet || questionSet.length === 0) {
//                     return res.status(404).json({ message: 'No question set found for this category.' });
//                 }

//                 // Now retrieve the questions from questionSet
//                 const questions = questionSet.dbquestions;
//                 console.log("Actual Questions", questions);


//                 // Ensure that questions is an array
//                 if (!Array.isArray(questions)) {
//                     return res.status(500).json({ message: 'Questions data is not an array.' });
//                 }

//                 // Map through the questions to structure the data as needed
//                 const formattedQuestions = questions.map(question => ({
//                     id: question._id,
//                     text: question.questionText,
//                     options: question.options, // Access the options directly
//                 }));

//                 console.log('Formatted Questions:', formattedQuestions);

//                 // Use formattedQuestions in your response or further logic
//                 res.status(200).json({
//                     message: 'Questions retrieved successfully.',
//                     questions: formattedQuestions
//                 });
//             }
//         // }
//         // else {
//         //     console.log("Please login");
//         // }
//     }
//     catch (error) {
//         console.log(error)
//     }
// })

//To GET the Score details

playerroute.get('/scorecard', authenticate, async (req, res) => {

    console.log('Logging of Dashboard Route starts here.....');

    const loginRole = req.userrole;
    console.log("Role:", loginRole);

    try {
        if (loginRole == 'User') {

            const playerId = req.username;
            console.log("Username:", playerId);

            // Fetch the player by ID
            const player = await Player.findOne({ dbUsername: playerId })

            const sortedScores = player.dbScores.sort((a, b) => new Date(b.date) - new Date(a.date));
            // console.log('Sorted: ', sortedScores);            

            if (!player) {
                return res.status(404).json({ message: 'Player not found' });
            }
            else {

                res.status(200).json({TotalScore: player.dbTotalScore, 
                    LatestScore: sortedScores.length > 0 ? sortedScores[0] : null})
                console.log('Data send to frontend');

            }
        }
    }
    catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Failed to retrieve dashboard data' });
    }
});

export { playerroute }