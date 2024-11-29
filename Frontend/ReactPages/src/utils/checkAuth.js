const checkAuth = async () => {
    try {
        const response = await fetch('http://localhost:3000/check-auth', {
            method: 'GET',
            credentials: 'include',
        });
        const data = await response.json();
        console.log('User data from checkAuth: ', data);
        return data; // Return data if needed
    } catch (error) {
        console.error('Error in checkAuth:', error);
        throw error; // Handle errors appropriately
    }
};

export default checkAuth;
