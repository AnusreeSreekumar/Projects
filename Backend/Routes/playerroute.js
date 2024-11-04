import { Router } from "express";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
// import { authenticate } from "../Middleware/auth.js";

dotenv.config();
const playerroute = Router();
const SecretKey = process.env.secretKey

//User schema
const playerSchema = new mongoose.Schema({
    dbUsername: String,
    dbEmail: { type: String, unique: true },
    dbPassword: String,
    dbRole: String
})

const User = mongoose.model('playerdetails', playerSchema)

mongoose.connect('mongodb://localhost:27017/TriviaHub')

playerroute.get('/', (req, res) => {

    res.send("Hello World")
});

//User Signup 
playerroute.post('/signup', async (req, res) => {

    try {

        const data = req.body;
        const { Username,
            Email,
            Password
        } = data
        // console.log("Req data:",data);

        const Role = "User"
        const newP = await bcrypt.hash(Password, 10);
        const existingUser = await User.findOne({ dbEmail: Email })

        if (existingUser) {

            res.status(404).json({ message: "Player exists in DB" })
            console.log("User already registered");
        }
        else {

            const newUser = new User({
                dbUsername: Username,
                dbEmail: Email,
                dbPassword: newP,
                dbRole: Role
            })
            await newUser.save();
            res.status(200).json({ message: "Player entry created" });
            console.log("User registred successfully");
        }
    }
    catch (error) {
        console.log(error);
    }

})

//User login
playerroute.post('/login', async (req, res) => {

    try {

        const { Email, Password } = req.body

        const result = await User.findOne({ dbEmail: Email })
        if (result) {

            const isvalid = await bcrypt.compare(Password, result.dbPassword)
            if (isvalid) {
                const token = jwt.sign({ username: result.dbEmail, userrole: result.dbRole }, SecretKey, { expiresIn: '1h' })
                console.log("Token:",token);
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
    catch(error){
        res.status(404).json(error)
        console.log(error);
    }
})

export { playerroute }