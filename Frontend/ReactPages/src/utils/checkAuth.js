const checkAuth = async () => {
    try {
        const response = await fetch('http://localhost:3000/check-auth', {
            method: 'GET',
            credentials: 'include', // Send cookies with the request
        });

        if (!response.ok) {
            throw new Error('Authentication failed');
        }

        const data = await response.json();
        console.log('User data:', data);

        // Redirect based on role
        if (data.role === 'admin') {
            window.location.href = '/admin-dashboard';
        } else if (data.role === 'User') {
            window.location.href = '/player-dashboard';
        }
    } catch (error) {
        console.error('Error checking authentication:', error);
        window.location.href = '/login'; // Redirect to login on failure
    }
};

// Call this function on page load or login

export default checkAuth
