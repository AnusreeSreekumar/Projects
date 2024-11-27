import { jwtDecode } from 'jwt-decode'

const getUserType = () => {

    console.log(document.cookie);
    // const token = document.cookie.split(';')
    //     .find((row) => row.includes('AuthToken='))
        // .startsWith('AuthToken='))
    // console.log('token: ', token);
    // if (!token) {
    //     console.error("Token not found in cookies");
    //     return undefined;  // Return undefined if no token found
    // }
    // else {

    //     const decodedToken = jwt.decode(token.split('=')[1]);
    //     console.log('Decoded Token: ',decodedToken);
        
    //     if (decodedToken && decodedToken.userrole) {
    //         return decodedToken.userrole;  // Return the userrole from decoded token
    //     } else {
    //         console.error("User role not found in decoded token");
    //         return undefined;
    //     }
    // }
}

export default getUserType