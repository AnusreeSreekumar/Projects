import express, { json } from "express";
import { adminroute } from './Routes/adminroute.js';
import { playerroute } from "./Routes/playerroute.js";
import { loginroute } from "./Routes/loginroute.js";
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(json());
app.use('/', loginroute)
app.use('/', adminroute)
app.use('/', playerroute)

const port = process.env.port;

app.listen(port, () => {
    console.log(`Server is listening to ${port}`);
})
