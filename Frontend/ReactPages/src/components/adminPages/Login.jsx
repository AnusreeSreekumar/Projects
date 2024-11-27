import React from 'react'

const Login = () => {

    // Handle Login (for demonstration, you can replace it with actual login logic)
    const handleLogin = async (e) => {

        e.preventDefault()

        const loginDtls = {
            Email,
            Password
        };
        try {

            const response = await fetch('http://localhost:3000/login_admin', {

                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginDtls)
            });
            const data = await response.json();

            if (response.status == 200) {
                setEmail('');
                setPassword('');
                navigate('/dashboard')
                console.log(data);
            }
            else {
                console.log('Please check your credentials');
            }

        } catch (error) {
            console.log('Issue in Login', error);

        }
        navigate('/admin_dashboard');
    };

    return (
        <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-emerald-300 via-cyan-100 to-sky-200">
            <div className="bg-lime-100 shadow-md rounded-lg py-8 px-10 w-80 sm:w-96">
                <form onSubmit={handleLogin}>
                    <h3 className="text-center text-xl font-semibold mb-4">Login to Your Account</h3>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="text-right mb-6">
                        <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>
                    <button
                        className="w-56 bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 py-2 ml-8 text-center text-white font-semibold rounded-md hover:opacity-90"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
