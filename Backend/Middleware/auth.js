import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SecretKey = process.env.secretKey

const authenticate = (req, res, next) => {

    const cookies = req.headers.cookie;
    // req.cookies
    console.log('cookies from req: ',cookies);

    const cookie = cookies.split(';');
    console.log('Splitted cookie: ', cookie);
    
    for(const cooky of cookie) {
        
        const [name, token] = cooky.trim().split('=');
        console.log('name: ', name.toLowerCase());
        
        if (name.toLowerCase() === 'authtoken') {
            const tokenverifcn = jwt.verify(token, SecretKey)
            // console.log("Token in Authfile: ", tokenverifcn);
            req.UserName = tokenverifcn.username;
            req.UserRole = tokenverifcn.userrole;
            // console.log('UserName: ',req.UserName);
            // console.log('UserRole: ',req.UserRole);
            
            break;
        }
    };
    next();
}

export { authenticate }