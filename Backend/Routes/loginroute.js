import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from "../Models/adminSet.js";
import { Player } from "../Models/playerSet.js";
import { authenticate } from "../Middleware/auth.js";

const loginroute = Router();
const SecretKey = process.env.secretKey

loginroute.post('/login', async (req, res) => {

    try {
        let result;
        const { Email, Password } = req.body

        result = await Admin.findOne({ dbEmail: Email })
        if (!result) {

            result = await Player.findOne({ dbEmail: Email })
            if (result) {

                const isvalid = await bcrypt.compare(Password, result.dbPassword)
                if (isvalid) {
                    const token = jwt.sign(
                        { username: result.dbEmail, userrole: result.dbRole },
                        SecretKey,
                        { expiresIn: '1h' }
                    )
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
                res.status(404).json({ message: "Not authorised" })
                console.log("Not authorised");
            }
        }
        else {

            const isvalid = await bcrypt.compare(Password, result.dbPassword)
            if (isvalid) {
                const token = jwt.sign(
                    { username: result.dbEmail, userrole: result.dbRole },
                    SecretKey,
                    { expiresIn: '1h' }
                )
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
    }
    catch (error) {
        res.status(404).json(error)
        console.log('Error occurred while login');
    }
})

loginroute.get('/check-auth', authenticate, (req,res) => {

    try{

        const loginRole = req.userrole
        const loginName = req.username
        res.status(200).json({loginRole, loginName})
    }
    catch(error){

        console.log('Issue in verifying');
        
    }
})

loginroute.get("/logout", (req, res) => {
    res.clearCookie("Authtoken");
    res.status(200).send("Logout successful");
    return res;
  });

export { loginroute}
