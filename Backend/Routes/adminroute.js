import { Router } from "express";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
// import { authenticate } from "../Middleware/auth.js";

dotenv.config();
const adminroute = Router();

//User schema
const adminSchema = new mongoose.Schema({
    dbUsername: String,
    dbEmail: { type: String, unique: true },
    dbPassword: String
})

const Admin = mongoose.model('admindetails', adminSchema)

mongoose.connect('mongodb://localhost:27017/TriviaHub')

adminroute.get('/', (req, res) => {

    res.send("Hello World")
});

adminroute.post('/signup_admin', async (req, res) => {

    try {

        const data = req.body;
        const { Username,
            Email,
            Password
        } = data
        // console.log("Req data:",data);

        const existingUser = await Admin.findOne({dbEmail : Email})

        // if(existingUser){

        //     res.status(404).json({message: "Admin exists in DB"})
        //     console.log("Admin details already present");
        // }
        // else{

            const newAdmin = new Admin({
                dbUsername : Username,
                dbEmail : Email,
                dbPassword : Password
            })
            await newAdmin.save();
            res.status(200).json({message: "Admin entry created"});
            console.log("Admin details added to DB");
        // }
    }
    catch(error){
        console.log(error); 
    }
    
})

export { adminroute }